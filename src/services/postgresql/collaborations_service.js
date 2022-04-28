const PostgresBase = require('./base')
const Collaboration = require('@data/collaboration/collaboration')
const InvariantError = require('@exceptions/invariant_error')
const UsersService = require('./users_service')

class CollaborationsService extends PostgresBase {
  #usersService

  /**
   * Construct a {@link CollaborationsService}
   *
   * @param {UsersService} usersService Users services
   */
  constructor (usersService) {
    super()
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
    const newCollaboration = new Collaboration({ playlistId, userId })

    const query = {
      text: `INSERT INTO ${Collaboration.tableName} (id, playlist_id, user_id) VALUES($1, $2, $3) RETURNING id`,
      values: [newCollaboration.id, newCollaboration.playlistId, newCollaboration.userId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add collaboration failed')
    }
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
      text: `DELETE FROM  ${Collaboration.tableName} WHERE playlist_id = $1 AND user_id = $2 RETURNING id`,
      values: [playlistId, userId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Delete collaboration failed')
    }

    return result.rows[0]
  }

  /**
   * Verifies {@link Collaboration} of {@link Playlist} with a {@link User} from the database.
   *
   * @param {string} playlistId Playlist ID
   * @param {string} userId User ID
   * @returns {Promise<Collaboration>} Collaboration {@link Collaboration.id id}
   */
  async verifyCollaborator (playlistId, userId) {
    const query = {
      text: `SELECT * FROM ${Collaboration.tableName} WHERE playlist_id = $1 AND user_id = $2`,
      values: [playlistId, userId]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Kolaborasi gagal diverifikasi')
    }
    const collaboration = result.rows.map(Collaboration.mapDBToModel)[0]

    return collaboration
  }
}

module.exports = CollaborationsService
