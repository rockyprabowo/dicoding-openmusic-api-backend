const ClientError = require('./client_error')

/**
 * Represent a not found error.
 *
 * @memberof module:exceptions/client_error
 */
class NotFoundError extends ClientError {
  name
  /**
   * Construct a new {@link NotFoundError} with a {@link NotFoundError.message message} and 404 HTTP status code.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

module.exports = NotFoundError
