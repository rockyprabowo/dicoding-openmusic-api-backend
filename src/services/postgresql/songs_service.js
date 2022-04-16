const PostgresBase = require('./base')

/**
 * Songs Service
 *
 * @module services/postgresql
 * @typedef {import('../../data/song/song')} Song
 */
class SongsService extends PostgresBase {
  // TODO: Implement SongsService

  /**
   * Adds a {@link Song} into the database
   */
  async addSong () {}

  /**
   * Get all {@link Song} from the database
   */
  async getSongs () {}

  /**
   * Get all {@link Song} by its {@link Song.id id} from the database
   */
  async getSongById () {}

  /**
   * Edit the {@link Song} with {@link Song.id id} from the database
   */
  async editSongById () {}

  /**
   * Delete the {@link Song} with {@link Song.id id} from the database
   */
  async deleteSongById () {}
}

module.exports = SongsService
