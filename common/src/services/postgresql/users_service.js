const PostgresBase = require('./base')
const User = require('../../data/user/user')
const { UserRequestPayload } = require('../../types/data/user')
const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')
const AuthenticationError = require('../../exceptions/authentication_error')
const CacheService = require('../redis/cache_service')
const { QueryConfig } = require('../../types/services/postgresql')

/**
 * OpenMusic API - Users Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/users
 */

/**
 * Represents a service class related to {@link Users}.
 *
 * @memberof module:services/postgresql/users
 */
class UsersService extends PostgresBase {
  #cacheService

  /**
   * Construct a {@link PlaylistsCollaborationsService}
   *
   * @param {CacheService} cacheService Cache services
   */
  constructor (cacheService) {
    super()
    this.#cacheService = cacheService
  }

  /**
   * Adds a user
   *
   * @param {UserRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted User {@link User.id id}
   */
  addUser = async (payload) => {
    await this.verifyNewUsername(
      /** @type {string} */ (payload.username)
    )

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
    let usernameExists
    try {
      usernameExists = await this.#cacheService.sIsMember(User.usernamesCacheKey, username)
    } catch (error) {
      const query = {
        text: 'SELECT username FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.db.query(query)

      usernameExists = result.rowCount > 0
    }

    if (usernameExists) {
      throw new InvariantError('Add user failed. Username already taken.')
    }

    await this.#cacheService.sAdd(User.usernamesCacheKey, username)
    await this.#cacheService.expire(User.usernamesCacheKey, 1800)
  }

  /**
   * Get a user by their id
   *
   * @param {string} userId User id to verify
   * @returns {Promise<User>} User
   */
  getUserById = async (userId) => {
    const mapper = User.mapDBToModelWithoutPassword
    try {
      const cachedUser = await this.#cacheService.get(User.userCacheKey(userId))
      return mapper(
        JSON.parse(
          /** @type {string} */ (cachedUser)
        )
      )
    } catch (error) {
      /** @type {QueryConfig} */
      const query = {
        text: 'SELECT id, username, fullname FROM users WHERE id = $1',
        values: [userId]
      }

      const result = await this.db.query(query)

      if (result.rows.length === 0) {
        throw new NotFoundError('User not found.')
      }

      const user = result.rows.map(mapper)[0]

      await this.#cacheService.set(User.userCacheKey(userId), JSON.stringify(user), 1800)

      return user
    }
  }

  /**
   * Verifies user credentials
   *
   * @param {string} username Username
   * @param {string} password Password
   * @returns {Promise<{id: string}>} User {@link User.id id}
   */
  verifyUserCredential = async (username, password) => {
    const mapper = User.mapDBToModel

    let user
    try {
      const cachedCredential = await this.#cacheService.get(User.authCredentialCacheKey(username))
      user = mapper(
        JSON.parse(
          /** @type {string} */ (cachedCredential)
        )
      )
    } catch (error) {
      const query = {
        text: 'SELECT id, password FROM users WHERE username = $1',
        values: [username]
      }

      const result = await this.db.query(query)

      if (result.rowCount === 0) {
        throw new AuthenticationError('Credentials given are invalid.')
      }

      user = result.rows.map(mapper)[0]
    }

    user.passwordToCheck = password

    if (!user.passwordValid) {
      throw new AuthenticationError('Credentials given are invalid.')
    }

    const cachedUser = { id: user.id, password: user.hashedPassword }

    await this.#cacheService.set(User.authCredentialCacheKey(username), JSON.stringify(cachedUser), 1800)

    return { id: user.id }
  }
}

module.exports = UsersService
