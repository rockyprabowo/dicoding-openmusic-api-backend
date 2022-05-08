const PostgresBase = require('./base')
const UsersService = require('./users_service')
const PlaylistCollaboration = require('../../data/playlist/playlist_collaboration')
const InvariantError = require('../../exceptions/invariant_error')
const CacheService = require('../redis/cache_service')

/**
 * OpenMusic API - Playlists Collaborations Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/playlists_collaborations
 */

/**
 * Represents a service class related to {@link PlaylistCollaboration}.
 *
 * @memberof module:services/postgresql/playlists_collaborations
 */
class PlaylistsCollaborationsService extends PostgresBase {
  #usersService
  #cacheService

  /**
   * Construct a {@link PlaylistsCollaborationsService}
   *
   * @param {CacheService} cacheService Cache services
   * @param {UsersService} usersService Users services
   */
  constructor (cacheService, usersService) {
    super()
    this.#cacheService = cacheService
    this.#usersService = usersService
  }

  /**
   * Playlist collaboration cache key
   *
   * @param {string} playlistId ID
   * @returns {string} Cache key
   */
  static collaborationsCacheKey = (playlistId) => (`playlists:${playlistId}:collaborations`)

  /**
   * Adds {@link Collaboration} of {@link Playlist} with a {@link User} to the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<{id: string}>} Newly persisted Collaboration {@link Collaboration.id id}
   */
  async addCollaboration (playlistId, userId) {
    await this.#usersService.getUserById(userId)
    const newCollaboration = new PlaylistCollaboration({ playlistId, userId })

    const query = {
      text: `INSERT INTO ${PlaylistCollaboration.tableName} (id, playlist_id, user_id) VALUES($1, $2, $3) RETURNING id`,
      values: [newCollaboration.id, newCollaboration.playlistId, newCollaboration.userId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add collaboration failed')
    }

    await this.#cacheService.delete(UsersService.userPlaylistsCacheKey(userId))

    return result.rows[0]
  }

  /**
   * Deletes {@link Collaboration} of {@link Playlist} with a {@link User} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<{id: string}>} Deleted Collaboration {@link Collaboration.id id}
   */
  async deleteCollaboration (playlistId, userId) {
    const query = {
      text: `DELETE FROM  ${PlaylistCollaboration.tableName} WHERE playlist_id = $1 AND user_id = $2 RETURNING id`,
      values: [playlistId, userId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Delete collaboration failed')
    }

    await this.#cacheService.hDelete(PlaylistsCollaborationsService.collaborationsCacheKey(playlistId), userId)
    await this.#cacheService.delete(UsersService.userPlaylistsCacheKey(userId))

    return result.rows[0]
  }

  /**
   * Verifies {@link Collaboration} of {@link Playlist} with a {@link User} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<PlaylistCollaboration>} Collaboration {@link PlaylistCollaboration.id id}
   */
  async verifyCollaborator (playlistId, userId) {
    try {
      const cachedCollaboration = await this.#cacheService.hGet(PlaylistsCollaborationsService.collaborationsCacheKey(playlistId), userId)
      return JSON.parse(cachedCollaboration)
    } catch (error) {
      const query = {
        text: `SELECT * FROM ${PlaylistCollaboration.tableName} WHERE playlist_id = $1 AND user_id = $2`,
        values: [playlistId, userId]
      }

      const result = await this.db.query(query)

      if (result.rowCount === 0) {
        throw new InvariantError('Kolaborasi gagal diverifikasi')
      }
      const collaboration = result.rows.map(PlaylistCollaboration.mapDBToModel)[0]

      await this.#cacheService.hSet(PlaylistsCollaborationsService.collaborationsCacheKey(playlistId), userId, JSON.stringify(collaboration))

      return collaboration
    }
  }
}

module.exports = PlaylistsCollaborationsService
