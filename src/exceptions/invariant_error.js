const ClientError = require('./client_error')

/**
 * Represent an invariant error.
 *
 * @memberof module:exceptions/client_error
 */
class InvariantError extends ClientError {
  name
  /**
   * Construct a new {@link InvariantError} with a {@link InvariantError.message message} and 400 HTTP status code.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'InvariantError'
  }
}

module.exports = InvariantError
