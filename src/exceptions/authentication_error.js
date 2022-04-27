const ClientError = require('./client_error')

/**
 * Represent an authentication error
 *
 * @memberof module:exceptions/client_error
 */
class AuthenticationError extends ClientError {
  /**
   * Construct a new {@link AuthenticationError} with a {@link AuthenticationError.message message} and 400 HTTP status code.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

module.exports = AuthenticationError
