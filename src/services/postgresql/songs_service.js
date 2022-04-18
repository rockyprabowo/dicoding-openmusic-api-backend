const PostgresBase = require('./base')

/**
 * OpenMusic API - Songs Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/songs
 */

/**
 * @typedef {import('../../data/song/song')} Song
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
   * Get all {@link Song} by its {@link Song.id id} from the database.
   *
   * @async
   */
  async getSongById () {}

  /**
   * Edit the {@link Song} with {@link Song.id id} from the database.
   *
   * @async
   */
  async editSongById () {}

  /**
   * Delete the {@link Song} with {@link Song.id id} from the database.
   *
   * @async
   */
  async deleteSongById () {}
}

module.exports = SongsService
