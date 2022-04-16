const InvariantError = require('../../exceptions/invariant_error')
const Validator = require('../base')
const SongPayloadSchema = require('./schema')

/**
 * Represent the validator for {@link Song}
 *
 * @typedef {import('../../data/song/song')} Song
 * @module validators
 */
class SongValidator extends Validator {
  /**
   * @param {object} payload Object payload
   */
  validate (payload) {
    const validationResult = SongPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = SongValidator
