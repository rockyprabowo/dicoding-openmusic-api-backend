const UnimplementedError = require('../exceptions/unimplemented_error')

/**
 * Represent a base validator class
 *
 * @module validators
 */
class Validator {
  /**
   * Validate the {@link payload}
   *
   * @abstract
   * @param {object} payload Object payload
   * @returns {void|never} `void` or `UnimplementedError`
   */
  validate (payload) {
    throw new UnimplementedError()
  }
}

module.exports = Validator
