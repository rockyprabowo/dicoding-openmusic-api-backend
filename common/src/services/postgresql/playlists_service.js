const PostgresBase = require('./base')

const SongsService = require('./songs_service')
const PlaylistsCollaborationsService = require('./playlists_collaborations_service')
const CacheService = require('../redis/cache_service')

const User = require('../../data/user/user')
const Song = require('../../data/song/song')
const PlaylistCollaboration = require('../../data/playlist/playlist_collaboration')
const { Playlist, PlaylistSong } = require('../../data/playlist/playlist')
const { PlaylistActivities, PlaylistActivitiesItem } = require('../../data/playlist/playlist_activities')

const {
  PlaylistRequestPayload,
  PlaylistSongRequestPayload,
  PlaylistActivitiesItemPayload,
  CacheablePlaylist,
  CacheablePlaylistActivities,
  CacheablePlaylists
} = require('../../types/data/playlist')

const { CacheableSongCollection, SongListItem } = require('../../types/data/song')
const { QueryConfig } = require('../../types/services/postgresql')

const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')
const AuthorisationError = require('../../exceptions/authorisation_error')

/**
 * OpenMusic API - Playlists Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/playlists
 */

/**
 * Represents a service class related to {@link Playlist}.
 *
 * @memberof module:services/postgresql/playlists
 */
class PlaylistsService extends PostgresBase {
  #playlistsCollaborationService
  #songsService
  #cacheService

  /**
   * Constructs Playlists Service
   *
   * @param {CacheService} cacheService Cache service
   * @param {SongsService} songsService Songs Service
   * @param {PlaylistsCollaborationsService} collaborationsService PlaylistsCollaborations Service
   */
  constructor (cacheService, songsService, collaborationsService) {
    super()
    this.#cacheService = cacheService
    this.#songsService = songsService
    this.#playlistsCollaborationService = collaborationsService
  }

  /**
   * Verifies playlist ownership
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId User {@link User.id id}
   */
  verifyPlaylistOwner = async (playlistId, userId) => {
    const ownerId = await this.getPlaylistOwnerById(playlistId)

    if (ownerId !== userId) {
      throw new AuthorisationError('Unauthorised resource access.')
    }
  }

  /**
   * Verifies playlist access
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId User {@link User.id id}
   */
  verifyPlaylistAccess = async (playlistId, userId) => {
    try {
      await this.verifyPlaylistOwner(playlistId, userId)
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      try {
        await this.#playlistsCollaborationService.verifyCollaborator(playlistId, userId)
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

    const ownerId = /** @type {string} */ (newPlaylist.ownerId)

    await this.#cacheService.dropCaches([
      User.userPlaylistsCacheKey(ownerId)
    ])

    return result.rows[0]
  }

  /**
   * Get all {@link Playlist} from the database.
   *
   * @param {string} userId Owner ID
   * @returns {Promise<CacheablePlaylists>} {@link Playlist} owned by {@link User user}
   * @async
   */
  getPlaylists = async (userId) => {
    try {
      const cachedPlaylists = await this.#cacheService.get(User.userPlaylistsCacheKey(userId))
      return {
        playlists: Array.from(JSON.parse(cachedPlaylists)).map(Playlist.mapDBToPlaylistListItem),
        __fromCache: true
      }
    } catch (error) {
      /** @type {QueryConfig} */
      const query = {
        text: `SELECT ${Playlist.tableName}.id, ${Playlist.tableName}.name, ${Playlist.tableName}.owner, ${User.tableName}.username
        FROM ${Playlist.tableName}
        LEFT JOIN ${User.tableName} ON ${Playlist.tableName}.owner = ${User.tableName}.id
        LEFT JOIN ${PlaylistCollaboration.tableName} ON ${PlaylistCollaboration.tableName}.playlist_id = ${Playlist.tableName}.id
        WHERE ${Playlist.tableName}.owner = $1 OR ${PlaylistCollaboration.tableName}.user_id = $1`,
        values: [userId]
      }
      const result = await this.db.query(query)

      const playlists = result.rows.map(Playlist.mapDBToPlaylistListItem)
      const cachedPlaylists = result.rows.map(Playlist.mapDBToModelWithUsername)

      await this.#cacheService.set(User.userPlaylistsCacheKey(userId), JSON.stringify(cachedPlaylists), 1800)

      return {
        playlists,
        __fromCache: false
      }
    }
  }

  /**
   * Get a {@link Playlist} with its {@link Song songs} by its {@link Playlist.id id} from the database.
   *
   * @param {string} playlistId Owner ID
   * @param {string} userId User ID
   * @param {function(any): Playlist} playlistMapper Playlist mapper function
   * @param {function(any): SongListItem} songsMapper Playlist songs mapper function
   * @returns {Promise<CacheablePlaylist>} Playlist with {@link Playlist,id id}
   * @async
   */
  getPlaylistById = async (playlistId, userId,
    playlistMapper = Playlist.mapDBToModelWithUsername,
    songsMapper = Song.mapDBToSongListItem) => {
    await this.verifyPlaylistAccess(playlistId, userId)

    try {
      const cachedPlaylist = await this.#cacheService.get(Playlist.playlistCacheKey(playlistId))
      const cachedSongs = await this.#cacheService.get(Playlist.playlistSongsCacheKey(playlistId))
      /** @type {Playlist} */
      const playlist = playlistMapper(JSON.parse(cachedPlaylist))
      playlist.songs = Array.from(JSON.parse(cachedSongs)).map(songsMapper) ?? []

      return {
        playlist,
        __fromCache: true
      }
    } catch (error) {
      const { playlist, __fromCache: playlistCached } = await this.getPlaylistDataById(playlistId, playlistMapper)
      const { songs, __fromCache: songsCached } = await this.getPlaylistSongsById(playlistId, songsMapper)

      playlist.songs = songs
      return {
        playlist,
        __fromCache: playlistCached && songsCached
      }
    }
  }

  /**
   * Get a {@link Playlist} with its {@link Song songs} by its {@link Playlist.id id} from the database.
   *
   * @param {string} playlistId Owner ID
   * @returns {Promise<string>} Playlist with {@link Playlist.id id}
   * @async
   */
  getPlaylistOwnerById = async (playlistId) => {
    try {
      const cachedPlaylistOwner = await this.#cacheService.get(Playlist.playlistOwnerCacheKey(playlistId))
      return cachedPlaylistOwner
    } catch (error) {
      /** @type {QueryConfig} */
      const query = {
        text: `SELECT * FROM ${Playlist.tableName} WHERE id = $1`,
        values: [playlistId]
      }
      const result = await this.db.query(query)

      if (result.rowCount === 0) {
        throw new NotFoundError('Playlist not found')
      }
      const playlist = result.rows.map(Playlist.mapDBToModelWithUsername)[0]

      if (playlist.ownerId) {
        await this.#cacheService.set(Playlist.playlistOwnerCacheKey(playlistId), playlist.ownerId, 1800)
      }
      return /** @type {string} */ (playlist.ownerId)
    }
  }

  /**
   * Get a {@link Playlist} by its {@link Playlist.id id} from the database.
   *
   * @param {string} playlistId Owner ID
   * @param {function(any): Playlist} playlistMapper Playlist mapper function
   * @returns {Promise<CacheablePlaylist>} Playlist with {@link Playlist,id id}
   * @async
   */
  getPlaylistDataById = async (playlistId, playlistMapper = Playlist.mapDBToModelWithUsername) => {
    try {
      const cachedPlaylist = await this.#cacheService.get(Playlist.playlistCacheKey(playlistId))
      return {
        playlist: playlistMapper(JSON.parse(cachedPlaylist)),
        __fromCache: true
      }
    } catch (error) {
      /** @type {QueryConfig} */
      const playlistQuery = {
        text: `SELECT ${Playlist.tableName}.id, ${Playlist.tableName}.name, ${Playlist.tableName}.owner, ${User.tableName}.username
        FROM ${Playlist.tableName}
        LEFT JOIN ${User.tableName} ON ${Playlist.tableName}.owner = ${User.tableName}.id
        WHERE ${Playlist.tableName}.id = $1`,
        values: [playlistId]
      }

      const playlistResult = await this.db.query(playlistQuery)

      if (playlistResult.rowCount === 0) {
        throw new NotFoundError('Playlist not found')
      }

      const playlist = playlistResult.rows.map(playlistMapper)[0]
      const cachedPlaylist = playlistResult.rows.map(Playlist.mapDBToModelWithUsername)[0]

      await this.#cacheService.set(Playlist.playlistCacheKey(playlistId), JSON.stringify(cachedPlaylist), 1800)

      return {
        playlist,
        __fromCache: false
      }
    }
  }

  /**
   * Get a {@link Playlist} {@link Song songs} by its {@link Playlist.id id} from the cache or database.
   *
   * @param {string} playlistId Owner ID
   * @param {function(any): SongListItem} songsMapper Playlist songs mapper function
   * @returns {Promise<CacheableSongCollection>} Playlist with {@link Playlist,id id}
   * @async
   */
  getPlaylistSongsById = async (playlistId, songsMapper = Song.mapDBToSongListItem) => {
    try {
      const cachedSongs = await this.#cacheService.get(Playlist.playlistSongsCacheKey(playlistId))
      return {
        songs: Array.from(JSON.parse(cachedSongs)).map(songsMapper),
        __fromCache: true
      }
    } catch (error) {
      const playlistSongsQuery = {
        text: `SELECT ${PlaylistSong.tableName}.song_id as id,
          ${Song.tableName}.id, ${Song.tableName}.title, ${Song.tableName}.performer
        FROM ${PlaylistSong.tableName}
        LEFT JOIN ${Song.tableName} ON ${PlaylistSong.tableName}.song_id = ${Song.tableName}.id
        WHERE ${PlaylistSong.tableName}.playlist_id = $1`,
        values: [playlistId]
      }

      const playlistSongsResult = await this.db.query(playlistSongsQuery)
      const playlistSongs = playlistSongsResult.rows.map(songsMapper)

      await this.#cacheService.set(Playlist.playlistSongsCacheKey(playlistId), JSON.stringify(playlistSongs), 1800)

      return {
        songs: playlistSongs,
        __fromCache: false
      }
    }
  }

  /**
   * Get a {@link Playlist} with its {@link Song songs} by its {@link Playlist.id id} from the database for exporting.
   *
   * @param {string} playlistId Owner ID
   * @param {string} userId User ID
   * @returns {Promise<Playlist>} Playlist with {@link Playlist,id id}
   * @async
   */
  getPlaylistByIdForExport = async (playlistId, userId) => {
    const { playlist } = await this.getPlaylistById(playlistId, userId, Playlist.mapDataToExportOutput)
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

    await this.#cacheService.dropCaches([
      User.userPlaylistsCacheKey(userId),
      Playlist.playlistCacheKey(playlistId),
      Playlist.playlistOwnerCacheKey(playlistId),
      Playlist.playlistSongsCacheKey(playlistId),
      PlaylistActivities.playlistActivitiesCacheKey(playlistId),
      PlaylistCollaboration.collaboratorsCacheKey(playlistId)
    ])
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

    const songData = await this.#songsService.getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${PlaylistSong.tableName} (playlist_id, song_id) VALUES ($1, $2) RETURNING id`,
      values: [playlistId, songData.song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Add song ${songData.song.id} to ${playlistId} failed`)
    }

    await this.logActivity({ playlistId, songId, userId, action: 'add' })

    await this.#cacheService.dropCaches([
      Playlist.playlistSongsCacheKey(playlistId),
      PlaylistActivities.playlistActivitiesCacheKey(playlistId)
    ])

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

    const songData = await this.#songsService.getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${PlaylistSong.tableName} WHERE playlist_id = $1 AND song_id = $2 RETURNING id`,
      values: [playlistId, songData.song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Delete song ${songData.song.id} from ${playlistId} failed`)
    }

    await this.logActivity({ playlistId, songId, userId, action: 'delete' })

    await this.#cacheService.dropCaches([
      Playlist.playlistSongsCacheKey(playlistId),
      PlaylistActivities.playlistActivitiesCacheKey(playlistId)
    ])

    return result.rows[0]
  }

  /**
   * Gets {@link Playlist} {@link PlaylistActivities} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<CacheablePlaylistActivities>} Playlist Activities
   */
  getPlaylistActivities = async (playlistId, userId) => {
    try {
      const cachedPlaylistActivities = await this.#cacheService.get(PlaylistActivities.playlistActivitiesCacheKey(playlistId))
      const activities = Array.from(JSON.parse(cachedPlaylistActivities)).map(PlaylistActivitiesItem.mapDataToOutput)
      return {
        playlistActivities: { playlistId, activities },
        __fromCache: true
      }
    } catch (error) {
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
      const cachedActivities = result.rows.map(PlaylistActivitiesItem.mapDBToDataModel)
      const activities = result.rows.map(PlaylistActivitiesItem.mapDataToOutput)

      await this.#cacheService.set(PlaylistActivities.playlistActivitiesCacheKey(playlistId), JSON.stringify(cachedActivities), 1800)

      return {
        playlistActivities: { playlistId, activities },
        __fromCache: false
      }
    }
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
