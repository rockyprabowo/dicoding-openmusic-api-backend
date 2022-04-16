const Validator = require('../base')
const InvariantError = require('../../exceptions/invariant_error')
const AlbumPayloadSchema = require('./schema')

/**
 * Represent the validator for {@link Album}
 *
 * @typedef {import('../../data/album/album')} Album
 * @module validators
 */
class AlbumValidator extends Validator {
  /**
   * @param {object} payload Object payload
   */
  validate = (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = AlbumValidator
