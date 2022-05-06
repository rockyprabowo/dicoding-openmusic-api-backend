const Jwt = require('@hapi/jwt')
const InvariantError = require('@openmusic/common/exceptions/invariant_error')
const { JWTTokenPayload } = require('~types/utils/tokenise')

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
   * @param {JWTTokenPayload} payload Payload
   * @returns {string} Access Token
   */
  generateAccessToken = (payload) => Jwt.token.generate(payload, this.accessTokenKey)

  /**
   * Generates a new refresh token
   *
   * @param {JWTTokenPayload} payload Payload
   * @returns {string} Access Token
   */
  generateRefreshToken = (payload) => Jwt.token.generate(payload, this.refreshTokenKey)

  /**
   * Verifies a refresh token
   *
   * @param {string} refreshToken Refresh Token
   * @returns {JWTTokenPayload} Payload
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
