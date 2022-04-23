/**
 * Developer-related error types.
 *
 * @module exceptions/developer_error
 */

/**
 * Represent a developer related errors
 *
 */
class IFluffedUp extends Error {
  name
  statusCode

  /**
   * Construct a new {@link IFluffedUp} with a {@link IFluffedUp.message message} and {@link IFluffedUp.statusCode status code}.
   *
   * @param {string} [message] Error message
   * @param {number} [statusCode] HTTP status code
   */
  constructor (message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.name = 'IFluffedUp'
  }
}

module.exports = IFluffedUp
