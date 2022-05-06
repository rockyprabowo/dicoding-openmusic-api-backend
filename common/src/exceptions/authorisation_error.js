const ClientError = require('./client_error')

/**
 * Represent an authorisation error
 *
 * @memberof module:exceptions/client_error
 */
class AuthorisationError extends ClientError {
  /**
   * Construct a new {@link AuthorisationError} with a {@link AuthorisationError.message message} and 400 HTTP status code.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message, 403)
    this.name = 'AuthorizationError'
  }
}

module.exports = AuthorisationError
