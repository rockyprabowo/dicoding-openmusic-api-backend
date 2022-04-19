const UnimplementedError = require('@exceptions/not_implemented_error')

/**
 * Data validation layer
 *
 * @module validators
 */

/**
 * Represents a base validator class.
 *
 */
class Validator {
  /**
   * Validates the {@link payload} against a data validation schema.
   *
   * @abstract
   * @param {object} payload Object payload
   * @returns {(void | never)} Throws an exception or nothing
   */
  validate = (payload) => {
    throw new UnimplementedError()
  }
}

module.exports = Validator
