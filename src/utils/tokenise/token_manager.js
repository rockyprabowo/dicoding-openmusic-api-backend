const Jwt = require('@hapi/jwt')
const InvariantError = require('@exceptions/invariant_error')

// TODO: Define JWT Token Payload object typing

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
  get accessTokenKey () {
    return /** @type {string} */ (process.env.ACCESS_TOKEN_KEY)
  }

  get refreshTokenKey () {
    return /** @type {string} */ (process.env.REFRESH_TOKEN_KEY)
  }

  /**
   * Generates a new access token
   *
   * @param {{ id: string }} payload Payload
   * @returns {string} Access Token
   */
  generateAccessToken = (payload) => Jwt.token.generate(payload, this.accessTokenKey)

  /**
   * Generates a new refresh token
   *
   * @param {{ id: string }} payload Payload
   * @returns {string} Access Token
   */
  generateRefreshToken = (payload) => Jwt.token.generate(payload, this.refreshTokenKey)

  /**
   * Verifies a refresh token
   *
   * @param {string} refreshToken Refresh Token
   * @returns {{ id: string }} Payload
   */
  verifyRefreshToken = (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken)
      Jwt.token.verifySignature(artifacts, this.refreshTokenKey)
      const { payload } = artifacts.decoded
      return payload
    } catch (error) {
      throw new InvariantError('Refresh token invalid')
    }
  }
}

module.exports = TokenManager
