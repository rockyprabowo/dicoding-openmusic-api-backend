const PostgresBase = require('./base')

const InvariantError = require('@exceptions/invariant_error')
const NotFoundError = require('@exceptions/not_found_error')
const AuthorisationError = require('@exceptions/authorisation_error')

const Playlist = require('@data/playlist/playlist')
const User = require('@data/user/user')
const Song = require('@data/song/song')

const { PlaylistRequestPayload, PlaylistSongRequestPayload } = require('~types/data/playlist')
const { QueryConfig } = require('~types/services/postgresql')
const SongsService = require('./songs_service')
const ClientError = require('@exceptions/client_error')

class PlaylistsService extends PostgresBase {
  #tableName = Playlist.tableName

  /**
   * Verifies playlist ownership
   *
   * @param {string} playlistId Playlist {@link Playlist.id id}
   * @param {string} userId User {@link User.id id}
   */
  verifyPlaylistOwner = async (playlistId, userId) => {
    const query = {
      text: `SELECT * FROM ${this.#tableName} WHERE id = $1`,
      values: [playlistId]
    }
    const result = await this.db.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found')
    }

    const playlist = result.rows.map(Playlist.mapDBToModel)[0]

    if (playlist.ownerId !== userId) {
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
      if (error instanceof ClientError) {
        throw error
      }
      // TODO: Collaboration support in the future
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
      text: `INSERT INTO ${this.#tableName} (id, name, owner) VALUES ($1, $2, $3) RETURNING id`,
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
      text: `SELECT ${this.#tableName}.id, ${this.#tableName}.name, ${User.tableName}.username AS username
        FROM ${this.#tableName}
        LEFT JOIN ${User.tableName} ON ${this.#tableName}.owner = ${User.tableName}.id
        WHERE ${this.#tableName}.owner = $1`,
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
      text: `SELECT ${this.#tableName}.id, ${this.#tableName}.name, ${User.tableName}.username AS username
        FROM ${this.#tableName}
        LEFT JOIN ${User.tableName} ON ${this.#tableName}.owner = ${User.tableName}.id
        WHERE ${this.#tableName}.id = $1`,
      values: [playlistId]
    }

    const playlistResult = await this.db.query(playlistQuery)

    if (playlistResult.rowCount === 0) {
      throw new NotFoundError('Playlist not found')
    }

    const playlist = playlistResult.rows.map(Playlist.mapDBToPlaylistListItem)[0]

    const playlistSongsQuery = {
      text: `SELECT playlists_songs.song_id as id, songs.id, songs.title, songs.performer
        FROM playlists_songs
        LEFT JOIN songs ON playlists_songs.song_id = songs.id
        WHERE playlists_songs.playlist_id = $1`,
      values: [playlistId]
    }

    const playlistSongsResult = await this.db.query(playlistSongsQuery)

    playlist.songs = playlistSongsResult.rows.map(Song.mapDBToSongListItem)

    return playlist
  }

  /**
   * Delete an {@link Playlist} with {@link Playlist.id id} from database.
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
      text: `DELETE FROM ${this.#tableName} WHERE id = $1 RETURNING id`,
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

    const song = await (new SongsService()).getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: 'INSERT INTO playlists_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING id',
      values: [playlistId, song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Add song ${song.id} to ${playlistId} failed`)
    }

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

    const song = await (new SongsService()).getSongById(songId)

    /** @type {QueryConfig} */
    const query = {
      text: 'DELETE FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, song.id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError(`Delete song ${song.id} from ${playlistId} failed`)
    }

    return result.rows[0]
  }
}

module.exports = PlaylistsService
