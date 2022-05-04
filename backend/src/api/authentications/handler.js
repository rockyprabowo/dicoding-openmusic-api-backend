const { AuthenticationRequestPayload, RefreshTokenRequestPayload } = require('@openmusic/common/types/data/authentication/index')
const { AuthenticationsPluginOptions } = require('~types/api/authentications')
const { LifecycleMethod, ResponseObject } = require('~types/api')

/**
 * Authentications Plugin - Route Handler
 *
 * @typedef {import('./routes')} AuthenticationsRoutes
 * @typedef {import('@openmusic/common/data/user/user')} User
 */

/**
 * Represents a class handling the {@link AuthenticationsRoutes routes}
 *
 * @memberof module:api/authentications
 */
class AuthenticationsHandler {
  authenticationsService
  usersService
  tokenManager
  validators
  /**
   * Construct a new {@link AuthenticationsHandler} with {@link AuthenticationsPluginOptions}
   *
   * @param {AuthenticationsPluginOptions} options Authentications plugin options
   */
  constructor (options) {
    this.authenticationsService = options.authenticationsService
    this.usersService = options.usersService
    this.tokenManager = options.tokenManager
    this.validators = options.validators
  }

  /**
   * Handles `POST` request to authenticate a {@link User user}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postAuthenticationHandler = async (request, h) => {
    const payload = /** @type {AuthenticationRequestPayload} */ (request.payload)

    this.validators.UserRegistrationValidator.validate(payload)

    const { username, password } = payload
    const { id } = await this.usersService.verifyUserCredential(username, password)

    const accessToken = this.tokenManager.generateAccessToken({ id })
    const refreshToken = this.tokenManager.generateRefreshToken({ id })

    await this.authenticationsService.addRefreshToken(refreshToken)

    return h.response({
      status: 'success',
      message: 'Authentication success',
      data: {
        accessToken,
        refreshToken
      }
    }).code(201)
  }

  /**
   * Handles `PUT` request to generate a new access token for {@link User user}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  putAuthenticationHandler = async (request, h) => {
    const payload = /** @type {RefreshTokenRequestPayload} */ (request.payload)
    this.validators.RefreshTokenValidator.validate(payload)

    const { refreshToken } = payload
    await this.authenticationsService.verifyRefreshToken(refreshToken)
    const { id } = this.tokenManager.verifyRefreshToken(refreshToken)

    const accessToken = this.tokenManager.generateAccessToken({ id })

    return h.response({
      status: 'success',
      message: 'Access token updated',
      data: {
        accessToken
      }
    })
  }

  /**
   * Handles `DELETE` request to remove the refresh token of {@link User user}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deleteAuthenticationHandler = async (request, h) => {
    const payload = /** @type {RefreshTokenRequestPayload} */ (request.payload)

    this.validators.RefreshTokenValidator.validate(payload)

    const { refreshToken } = payload
    await this.authenticationsService.verifyRefreshToken(refreshToken)
    await this.authenticationsService.deleteRefreshToken(refreshToken)

    return h.response({
      status: 'success',
      message: 'Refresh token deleted'
    })
  }
}

module.exports = { AuthenticationsHandler }
