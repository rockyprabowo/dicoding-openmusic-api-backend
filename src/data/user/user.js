const { UserRequestPayload, UserDbRow, UserDbRowWithoutPassword } = require('~types/data/user')
const bcrypt = require('bcrypt')
const { nanoid } = require('nanoid')

/**
 * OpenMusic API - User data model
 *
 * @module data/user
 */

/**
 * Represents a User
 *
 * @memberof module:data/user
 */
class User {
  static tableName = 'users'
  username
  fullname
  #password
  #hashedPassword
  #newlyCreated = true

  /**
   * Gets the plaintext password set for newly created {@link User user}
   * Does nothing if {@link User} is mapped from database.
   *
   * @returns {(string | undefined)} Plaintext password or undefined
   */
  get newPassword () {
    if (this.#newlyCreated) {
      return this.#password
    }
  }

  /**
   * Gets the plaintext password set for newly created {@link User user}
   * Does nothing if {@link User} is mapped from database.
   *
   * @returns {(string | undefined)} Plaintext password or undefined
   */
  get currentPassword () {
    return this.newPassword
  }

  /**
   * Gets the plaintext password set for checking the existing {@link User user} persisted password
   *
   * @returns {(string | undefined)} Plaintext password or undefined
   */
  get passwordToCheck () {
    if (!this.#newlyCreated) {
      return this.#password
    }
  }

  /**
   * Gets the hashed password set for {@link User user}
   *
   * @returns {(string | undefined)} Hashed password or undefined
   */
  get hashedPassword () {
    return this.#hashedPassword
  }

  /**
   * Sets a new {@link User.password password} and its {@link User.hashedPassword hash} for newly created {@link User}.
   * Does nothing if {@link User} is mapped from database.
   *
   * @returns {void}
   */
  set newPassword (plainTextPassword) {
    if (this.#newlyCreated && plainTextPassword) {
      this.#password = plainTextPassword
      this.#hashedPassword = bcrypt.hashSync(plainTextPassword, 10)
    }
  }

  /**
   * Sets the plaintext password for checking the existing {@link User user} persisted password.
   *
   * Does nothing if {@link User} is not mapped from database.
   *
   * @returns {void}
   */
  set passwordToCheck (plainTextPassword) {
    if (!this.#newlyCreated && plainTextPassword) {
      this.#password = plainTextPassword
    }
  }

  /**
   * Checks if {@link User Users's} {@link User.password password} hash matches {@link User.hashedPassword hashed password}
   * Does nothing if {@link User} is not mapped from database.
   *
   * @returns {boolean} Returns `true` if matches, `false` otherwise.
   */
  get passwordValid () {
    if (!this.#newlyCreated && this.#password && this.#hashedPassword) {
      return bcrypt.compareSync(this.#password, this.#hashedPassword)
    }
    return false
  }

  /**
   * Construct a {@link User}
   *
   * @param {UserRequestPayload} payload Payload
   */
  constructor (payload) {
    this.id = payload.id ?? User.generateId()
    this.username = payload.username
    this.fullname = payload.fullname
    if (payload.__fromDb) {
      // Existing user
      this.#newlyCreated = false
      this.#password = payload.password
      this.#hashedPassword = payload.hashedPassword
    } else {
      // New, not persisted yet user
      this.newPassword = payload.password
    }
  }

  /**
   * Generates a new random `id` for {@link User}
   *
   * @returns {string} Random `id` for {@link User}
   */
  static generateId () {
    return `user-${nanoid(16)}`
  }

  /**
   * Maps database result(s) to this data model
   *
   * @param {UserDbRow} dbRow Item from database
   * @returns {User} This data model
   */
  static mapDBToModel = ({ id, username, fullname, password }) => new User({ id, username, fullname, hashedPassword: password, __fromDb: true })

  /**
   * Maps database result(s) to this data model, without hashed password
   *
   * @param {UserDbRowWithoutPassword} dbRow Item from database
   * @returns {User} This data model
   */
  static mapDBToModelWithoutPassword = ({ id, username, fullname }) => new User({ id, username, fullname, __fromDb: true })
}

module.exports = User
