const Jwt = require('@hapi/jwt')
const InvariantError = require('@exceptions/invariant_error')
const SecretsMissing = require('@exceptions/secrets_missing_error')

/**
 * Token manager
 *
 * @module utils/tokenise
 */

/**
 * Meditates token management
 *
 */
class TokenManager {
  static get accessTokenKey () {
    return /** @type {string} */ (process.env.ACCESS_TOKEN_KEY)
  }

  static get refreshTokenKey () {
    return /** @type {string} */ (process.env.REFRESH_TOKEN_KEY)
  }

  /**
   * Generates a new access token
   *
   * @param {{ id: string }} payload Payload
   * @returns {string} Access Token
   */
  static generateAccessToken = (payload) => Jwt.token.generate(payload, this.accessTokenKey)

  /**
   * Generates a new refresh token
   *
   * @param {{ id: string }} payload Payload
   * @returns {string} Access Token
   */
  static generateRefreshToken = (payload) => Jwt.token.generate(payload, this.refreshTokenKey)

  /**
   * Verifies a refresh token
   *
   * @param {string} refreshToken Refresh Token
   * @returns {{ id: string }} Payload
   */
  static verifyRefreshToken = (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken)
      Jwt.token.verifySignature(artifacts, this.refreshTokenKey)
      const { payload } = artifacts.decoded
      return payload
    } catch (error) {
      if (error instanceof SecretsMissing) {
        throw error
      }
      throw new InvariantError('Refresh token tidak valid')
    }
  }
}

module.exports = TokenManager
