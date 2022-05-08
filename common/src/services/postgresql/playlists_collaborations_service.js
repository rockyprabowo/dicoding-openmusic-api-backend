const PostgresBase = require('./base')
const UsersService = require('./users_service')
const CacheService = require('../redis/cache_service')
const User = require('../../data/user/user')
const PlaylistCollaboration = require('../../data/playlist/playlist_collaboration')
const InvariantError = require('../../exceptions/invariant_error')

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

    await this.#cacheService.delete(User.userPlaylistsCacheKey(userId))

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

    await this.#cacheService.sRem(PlaylistCollaboration.collaboratorsCacheKey(playlistId), userId)
    await this.#cacheService.delete(User.userPlaylistsCacheKey(userId))

    return result.rows[0]
  }

  /**
   * Verifies {@link Collaboration} of {@link Playlist} with a {@link User} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<void>} Has access for collaboration
   */
  async verifyCollaborator (playlistId, userId) {
    try {
      const inCachedCollaborators = await this.#cacheService.sIsMember(PlaylistCollaboration.collaboratorsCacheKey(playlistId), userId)
      if (!inCachedCollaborators) {
        throw new InvariantError('Kolaborasi gagal diverifikasi')
      }
    } catch (error) {
      const query = {
        text: `SELECT * FROM ${PlaylistCollaboration.tableName} WHERE playlist_id = $1 AND user_id = $2`,
        values: [playlistId, userId]
      }

      const result = await this.db.query(query)

      if (result.rowCount === 0) {
        throw new InvariantError('Kolaborasi gagal diverifikasi')
      }

      await this.#cacheService.sAdd(PlaylistCollaboration.collaboratorsCacheKey(playlistId), userId)
    }
  }
}

module.exports = PlaylistsCollaborationsService
