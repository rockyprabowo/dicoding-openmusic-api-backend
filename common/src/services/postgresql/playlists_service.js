const PostgresBase = require('./base')

const SongsService = require('./songs_service')
const CollaborationsService = require('./collaborations_service')

const User = require('../../data/user/user')
const Song = require('../../data/song/song')
const Collaboration = require('../../data/collaboration/collaboration')
const { Playlist, PlaylistSong } = require('../../data/playlist/playlist')
const { PlaylistActivities, PlaylistActivitiesItem } = require('../../data/playlist/playlist_activities')

const { PlaylistRequestPayload, PlaylistSongRequestPayload, PlaylistActivitiesItemPayload } = require('../../types/data/playlist')
const { QueryConfig } = require('../../types/services/postgresql')

const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')
const AuthorisationError = require('../../exceptions/authorisation_error')

class PlaylistsService extends PostgresBase {
  #collaborationService
  #songsService

  /**
   * Constructs Playlists Service
   *
   * @param {CollaborationsService} collaborationsService Collaborations Service
   * @param {SongsService} songsService Songs Service
   */
  constructor (collaborationsService, songsService) {
    super()
    this.#collaborationService = collaborationsService
    this.#songsService = songsService
  }

  /**
   * Verifies playlist ownership
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId User {@link User.id id}
   */
  verifyPlaylistOwner = async (playlistId, userId) => {
    const query = {
      text: `SELECT * FROM ${Playlist.tableName} WHERE id = $1`,
      values: [playlistId]
    }
    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('Playlist not found')
    }

    const playlist = result.rows.map(Playlist.mapDBToModelWithUsername)[0]

    if (playlist.ownerId !== userId) {
      throw new AuthorisationError('Unauthorised resource access.')
    }

    return playlist
  }

  /**
   * Verifies playlist access
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId User {@link User.id id}
   */
  verifyPlaylistAccess = async (playlistId, userId) => {
    try {
      return await this.verifyPlaylistOwner(playlistId, userId)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      try {
        await this.#collaborationService.verifyCollaborator(playlistId, userId)
      } catch {
        throw error
      }
    }
  }

  /**
   * Adds a {@link Playlist} into the database.
   *
   * @param {PlaylistRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted {@link Playlist} {@link Playlist.id id}
   * @async
   */
  addPlaylist = async (payload) => {
    const newPlaylist = new Playlist(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${Playlist.tableName} (id, name, owner) VALUES ($1, $2, $3) RETURNING id`,
      values: [newPlaylist.id, newPlaylist.name, newPlaylist.ownerId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add new playlist failed')
    }

    return result.rows[0]
  }

  /**
   * Get all {@link Playlist} from the database.
   *
   * @param {string} userId Owner ID
   * @returns {Promise<Playlist[]>} {@link Playlist} owned by {@link User user}
   * @async
   */
  getPlaylists = async (userId) => {
    /** @type {QueryConfig} */
    const query = {
      text: `SELECT ${Playlist.tableName}.id, ${Playlist.tableName}.name, ${User.tableName}.username
        FROM ${Playlist.tableName}
        LEFT JOIN ${User.tableName} ON ${Playlist.tableName}.owner = ${User.tableName}.id
        LEFT JOIN ${Collaboration.tableName} ON ${Collaboration.tableName}.playlist_id = ${Playlist.tableName}.id
        WHERE ${Playlist.tableName}.owner = $1 OR ${Collaboration.tableName}.user_id = $1`,
      values: [userId]
    }
    const result = await this.db.query(query)
    const playlists = result.rows.map(Playlist.mapDBToPlaylistListItem)

    return playlists
  }

  /**
   * Get a {@link Playlist} with its {@link Song songs} by its {@link Playlist.id id} from the database.
   *
   * @param {string} playlistId Owner ID
   * @param {string} userId User ID
   * @returns {Promise<Playlist>} Playlist with {@link Playlist,id id}
   * @async
   */
  getPlaylistById = async (playlistId, userId) => {
    await this.verifyPlaylistAccess(playlistId, userId)

    /** @type {QueryConfig} */
    const playlistQuery = {
      text: `SELECT ${Playlist.tableName}.id, ${Playlist.tableName}.name, ${User.tableName}.username
        FROM ${Playlist.tableName}
        LEFT JOIN ${User.tableName} ON ${Playlist.tableName}.owner = ${User.tableName}.id
        WHERE ${Playlist.tableName}.id = $1`,
      values: [playlistId]
    }

    const playlistResult = await this.db.query(playlistQuery)

    if (playlistResult.rowCount === 0) {
      throw new NotFoundError('Playlist not found')
    }

    const playlist = playlistResult.rows.map(Playlist.mapDBToPlaylistListItem)[0]

    const playlistSongsQuery = {
      text: `SELECT ${PlaylistSong.tableName}.song_id as id, ${Song.tableName}.id, ${Song.tableName}.title, ${Song.tableName}.performer
        FROM ${PlaylistSong.tableName}
        LEFT JOIN ${Song.tableName} ON ${PlaylistSong.tableName}.song_id = ${Song.tableName}.id
        WHERE ${PlaylistSong.tableName}.playlist_id = $1`,
      values: [playlistId]
    }

    const playlistSongsResult = await this.db.query(playlistSongsQuery)

    playlist.songs = playlistSongsResult.rows.map(Song.mapDBToSongListItem)

    return playlist
  }

  /**
   * Delete a {@link Playlist} with {@link Playlist.id id} from database.
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId Owner {@link User.id id}
   * @returns {Promise<{id: string}>} Deleted Playlist {@link Playlist.id id}
   * @async
   */
  deletePlaylistById = async (playlistId, userId) => {
    await this.verifyPlaylistOwner(playlistId, userId)

    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${Playlist.tableName} WHERE id = $1 RETURNING id`,
      values: [playlistId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Playlist ${playlistId} delete failed.`)
    }

    return result.rows[0]
  }

  /**
   * Adds a {@link Song} to {@link Playlist} into the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @param {PlaylistSongRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly added {@link Playlist playlist} {@link Song song}
   * @async
   */
  addPlaylistSong = async (playlistId, userId, payload) => {
    await this.verifyPlaylistAccess(playlistId, userId)

    const { songId } = payload

    const song = await this.#songsService.getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${PlaylistSong.tableName} (playlist_id, song_id) VALUES ($1, $2) RETURNING id`,
      values: [playlistId, song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Add song ${song.id} to ${playlistId} failed`)
    }

    await this.logActivity({ playlistId, songId, userId, action: 'add' })

    return result.rows[0]
  }

  /**
   * Deletes a {@link Song} in {@link Playlist} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @param {PlaylistSongRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Deleted {@link Playlist playlist} {@link Song song}
   * @async
   */
  deletePlaylistSong = async (playlistId, userId, payload) => {
    await this.verifyPlaylistAccess(playlistId, userId)
    const { songId } = payload

    const song = await this.#songsService.getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${PlaylistSong.tableName} WHERE playlist_id = $1 AND song_id = $2 RETURNING id`,
      values: [playlistId, song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Delete song ${song.id} from ${playlistId} failed`)
    }

    await this.logActivity({ playlistId, songId, userId, action: 'delete' })

    return result.rows[0]
  }

  /**
   * Gets {@link Playlist} {@link PlaylistActivities} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<PlaylistActivities>} Playlist Activities
   */
  getPlaylistActivities = async (playlistId, userId) => {
    await this.verifyPlaylistAccess(playlistId, userId)

    /** @type {QueryConfig} */
    const query = {
      text: `SELECT song_id, ${Song.tableName}.title, user_id, ${User.tableName}.username, action, time
      FROM ${PlaylistActivities.tableName}
      LEFT JOIN ${User.tableName} on ${PlaylistActivities.tableName}.user_id = ${User.tableName}.id
      LEFT JOIN ${Song.tableName} on ${PlaylistActivities.tableName}.song_id = ${Song.tableName}.id
      WHERE playlist_id = $1
      ORDER BY ${PlaylistActivities.tableName}.id`,
      values: [playlistId]
    }
    const result = await this.db.query(query)
    const activities = result.rows.map(PlaylistActivitiesItem.mapDBToDataModel)

    return new PlaylistActivities({ playlistId, activities })
  }

  /**
   * Logs add/delete activity of a {@link Playlist}
   *
   * @param {PlaylistActivitiesItemPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly added {@link PlaylistActivitiesItem playlist activity}
   */
  logActivity = async (payload) => {
    const activity = new PlaylistActivitiesItem(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${PlaylistActivities.tableName} (playlist_id, song_id, user_id, action)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      values: [activity.playlistId, activity.songId, activity.userId, activity.action]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Activity logging of ${activity.playlistId} failed`)
    }

    return result.rows[0]
  }
}

module.exports = PlaylistsService
