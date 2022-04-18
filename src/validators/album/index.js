const Validator = require('../base')
const InvariantError = require('../../exceptions/invariant_error')
const AlbumPayloadSchema = require('./schema')

/**
 * Album Validator
 *
 * @module validators/album
 */

/**
 * @typedef {import('../../data/album/album')} Album
 */

/**
 * Represent the validator for {@link Album}.
 *
 * @augments Validator
 */
class AlbumValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link AlbumPayloadSchema}
   *
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
