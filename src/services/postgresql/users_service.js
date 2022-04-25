const PostgresBase = require('./base')
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
  addUser = async () => {}
  verifyNewUsername = async () => {}
  getUserById = async () => {}
  verifyUserCredential = async () => {}
}

module.exports = UsersService
