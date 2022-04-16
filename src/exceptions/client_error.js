/**
 * Represent a Client related errors
 *
 * @module exceptions
 */
class ClientError extends Error {
  name
  statusCode
  /**
   * @function Object() { [native code] }
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
