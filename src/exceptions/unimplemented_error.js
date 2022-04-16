/**
 * Represent an unimplemented error
 *
 * @module exceptions
 */
class UnimplementedError extends Error {
  name
  /**
   * @function Object() { [native code] }
   * @param {string} [message] Error message
   */
  constructor (message) {
    super(message)
    this.name = 'UnimplementedError'
  }
}

module.exports = UnimplementedError
