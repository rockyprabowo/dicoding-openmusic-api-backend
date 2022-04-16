const PostgresBase = require('./base')

/**
 * Albums Service
 *
 * @module services/postgresql
 * @typedef {import('../../data/album/album')} Album
 */
class AlbumsService extends PostgresBase {
  // TODO: Implement AlbumsService
  /**
   * Adds an {@link Album} into database
   */
  async addAlbum () {}

  /**
   * Get an {@link Album} by its {@link Album.id id} from database
   */
  async getAlbumById () {}

  /**
   * Edit an {@link Album} with {@link Album.id id} from database
   */
  async editAlbumById () {}

  /**
   * Delete an {@link Album} with {@link Album.id id} from database
   */
  async deleteAlbumById () {}
}

module.exports = AlbumsService
