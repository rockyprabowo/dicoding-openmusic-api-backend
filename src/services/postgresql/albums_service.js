const PostgresBase = require('./base')
const { AlbumRequestPayload } = require('~types/data/album')

/**
 * OpenMusic API - Albums Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/albums
 */

/**
 * Represents a service class related to {@link Album}.
 *
 * @augments PostgresBase
 */
class AlbumsService extends PostgresBase {
  // TODO: Implement AlbumsService
  /**
   * Adds an {@link Album} into database.
   *
   * @param {AlbumRequestPayload} payload Payload
   * @async
   */
  async addAlbum (payload) {
  }

  /**
   * Get an {@link Album} by its {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @async
   */
  async getAlbumById (id) {}

  /**
   * Edit an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @param {AlbumRequestPayload} payload Request Payload
   * @async
   */
  async editAlbumById (id, payload) {}

  /**
   * Delete an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @async
   */
  async deleteAlbumById (id) {}
}

module.exports = AlbumsService
