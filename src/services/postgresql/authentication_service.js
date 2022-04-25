const PostgresBase = require('./base')
/**
 * OpenMusic API - Authentications Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/authentications
 */

/**
 * Represents a service class related to {@link Authentications}.
 *
 * @augments PostgresBase
 */
class AuthenticationService extends PostgresBase {
  addRefreshToken = async () => {}
  verifyRefreshToken = async () => {}
  deleteRefreshToken = async () => {}
}

module.exports = AuthenticationService
