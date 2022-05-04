/**
 *  Runtime-related error types.
 *
 * @module exceptions/runtime_error
 */

/**
 * Represent a secrets missing error.
 *
 * @memberof module:exceptions/runtime_error
 */
class ConfigurationMissing extends Error {
  name

  /**
   * Construct a new {@link ConfigurationMissing} with a {@link ConfigurationMissing.message message}.
   *
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'ConfigurationMissing'
  }
}

module.exports = ConfigurationMissing
