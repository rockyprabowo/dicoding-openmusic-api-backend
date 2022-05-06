/**
 * Client-related error types.
 *
 * @module exceptions/client_error
 */

/**
 * Represent a Client related errors
 *
 */
class ClientError extends Error {
  name
  statusCode

  /**
   * Construct a new {@link ClientError} with a {@link ClientError.message message} and {@link ClientError.statusCode status code}.
   *
   * @param {string} [message] Error message
   * @param {number} [statusCode] HTTP status code
   */
  constructor (message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}

module.exports = ClientError
