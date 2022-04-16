const ClientError = require('./client_error')

/**
 * Represent an invariant errors
 *
 * @module exceptions
 */
class InvariantError extends ClientError {
  /**
   * @function Object() { [native code] }
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'InvariantError'
  }
}

module.exports = InvariantError
