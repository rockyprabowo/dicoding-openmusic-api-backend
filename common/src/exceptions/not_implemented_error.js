/**
 * Represent an unimplemented error.
 *
 * @module exceptions/developer_error
 */
class NotImplementedError extends Error {
  name

  /**
   * Construct a new {@link NotImplementedError} with a {@link NotImplementedError.message message}.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'NotImplementedError'
  }
}

module.exports = NotImplementedError
