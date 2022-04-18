const PostgresBase = require('./base')

/**
 * OpenMusic API - Albums Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/albums
 */

/**
 * @typedef {import('../../data/album/album')} Album
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
   * @async
   */
  async addAlbum () {}

  /**
   * Get an {@link Album} by its {@link Album.id id} from database.
   *
   * @async
   */
  async getAlbumById () {}

  /**
   * Edit an {@link Album} with {@link Album.id id} from database.
   *
   * @async
   */
  async editAlbumById () {}

  /**
   * Delete an {@link Album} with {@link Album.id id} from database.
   *
   * @async
   */
  async deleteAlbumById () {}
}

module.exports = AlbumsService
