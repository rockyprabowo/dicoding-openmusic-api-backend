const IFluffedUp = require('./developer_error')

/**
 * Represent an unimplemented error.
 *
 * @memberof module:exceptions/developer_error
 */
class NotImplementedError extends IFluffedUp {
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
