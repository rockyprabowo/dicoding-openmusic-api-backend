/**
 * Represent a secrets missing error.
 *
 * @memberof module:exceptions/runtime_error
 */
class SecretsMissing extends Error {
  name

  /**
   * Construct a new {@link SecretsMissing} with a {@link SecretsMissing.message message}.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'SecretsMissing'
  }
}

module.exports = SecretsMissing
