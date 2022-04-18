const InvariantError = require('../../exceptions/invariant_error')
const Validator = require('../base')
const SongPayloadSchema = require('./schema')

/**
 * Song Validator
 *
 * @module validators/song
 */

/**
 * @typedef {import('../../data/song/song')} Song
 */

/**
 * Represent the validator for {@link Song}.
 *
 * @augments Validator
 */
class SongValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link SongPayloadSchema}
   *
   * @override
   * @param {object} payload Object payload
   */
  validate = (payload) => {
    const validationResult = SongPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = SongValidator
