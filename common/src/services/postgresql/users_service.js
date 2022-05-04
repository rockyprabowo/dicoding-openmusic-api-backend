const PostgresBase = require('./base')
const User = require('../../data/user/user')
const { UserRequestPayload } = require('../../types/data/user')
const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')
const AuthenticationError = require('../../exceptions/authentication_error')
/**
 * OpenMusic API - Users Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/users
 */

/**
 * Represents a service class related to {@link Users}.
 *
 * @augments PostgresBase
 */
class UsersService extends PostgresBase {
  /**
   * Adds a user
   *
   * @param {UserRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted User {@link User.id id}
   */
  addUser = async (payload) => {
    await this.verifyNewUsername(payload.username)

    const user = new User(payload)

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [user.id, user.username, user.hashedPassword, user.fullname]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add user failed.')
    }

    return result.rows[0]
  }

  /**
   * Verifies a username
   *
   * @param {string} username Username to verify
   */
  verifyNewUsername = async (username) => {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username]
    }

    const result = await this.db.query(query)

    if (result.rows.length > 0) {
      throw new InvariantError('Add user failed. Username already taken.')
    }
  }

  /**
   * Get a user by their id
   *
   * @param {string} userId User id to verify
   * @returns {Promise<User>} User
   */
  getUserById = async (userId) => {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId]
    }

    const result = await this.db.query(query)

    if (result.rows.length === 0) {
      throw new NotFoundError('User not found.')
    }

    return result.rows.map(User.mapDBToModelWithoutPassword)[0]
  }

  /**
   *
   * @param {string} username Username
   * @param {string} password Password
   * @returns {Promise<{id: string}>} User {@link User.id id}
   */
  verifyUserCredential = async (username, password) => {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new AuthenticationError('Credentials given are invalid.')
    }

    const user = result.rows.map(User.mapDBToModel)[0]
    user.passwordToCheck = password

    if (!user.passwordValid) {
      throw new AuthenticationError('Credentials given are invalid.')
    }

    return { id: user.id }
  }
}

module.exports = UsersService
