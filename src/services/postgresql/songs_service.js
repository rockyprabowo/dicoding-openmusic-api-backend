const PostgresBase = require('./base')

/**
 * OpenMusic API - Songs Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/songs
 */

/**
 * Represents a service class related to {@link Song}.
 *
 * @augments PostgresBase
 */
class SongsService extends PostgresBase {
  // TODO: Implement SongsService

  /**
   * Adds a {@link Song} into the database.
   *
   * @async
   */
  async addSong () {}

  /**
   * Get all {@link Song} from the database.
   *
   * @async
   */
  async getSongs () {}

  /**
   * Get a {@link Song} by its {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @async
   */
  async getSongById (id) {}

  /**
   * Edit the {@link Song} with {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @async
   */
  async editSongById (id) {}

  /**
   * Delete the {@link Song} with {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @async
   */
  async deleteSongById (id) {}
}

module.exports = SongsService
