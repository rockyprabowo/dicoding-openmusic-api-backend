const ClientError = require('./client_error')

/**
 * Represent a not found error
 *
 * @module exceptions
 */
class NotFoundError extends ClientError {
  name
  /**
   * @function Object() { [native code] }
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

module.exports = NotFoundError
