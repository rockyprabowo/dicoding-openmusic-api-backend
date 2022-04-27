const Joi = require('joi')
const InvariantError = require('@exceptions/invariant_error')
/**
 * Data validation layer
 *
 * @module validators
 */

/**
 * Represents a validator class.
 *
 */
class Validator {
  #payload
  #schema

  /**
   *
   * @param {Joi.ObjectSchema} schema Joi object schema
   */
  constructor (schema) {
    this.#schema = schema
    this.#payload = {}
  }

  /**
   * Validates the {@link payload} against a data validation schema.
   *
   * @abstract
   * @param {object} payload Object payload
   * @returns {Joi.ValidationResult} Validation result
   */
  validate = (payload) => {
    this.#payload = payload
    return this.#execute()
  }

  #execute = () => {
    const validationResult = this.#schema.validate(this.#payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
    return validationResult
  }
}

module.exports = Validator
