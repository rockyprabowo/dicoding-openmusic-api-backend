const InvariantError = require('@exceptions/invariant_error')
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
  /**
   * Persist refresh token
   *
   * @param {string} token Token
   */
  addRefreshToken = async (token) => {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token]
    }

    await this.db.query(query)
  }

  /**
   * Verify refresh token
   *
   * @param {string} token Token
   */
  verifyRefreshToken = async (token) => {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token]
    }

    const result = await this.db.query(query)

    if (!result.rows.length) {
      throw new InvariantError('Invalid refresh token')
    }
  }

  /**
   * Delete refresh token
   *
   * @param {string} token Token
   */
  deleteRefreshToken = async (token) => {
    await this.verifyRefreshToken(token)

    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token]
    }

    await this.db.query(query)
  }
}

module.exports = AuthenticationService
