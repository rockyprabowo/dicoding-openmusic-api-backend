const Validator = require('@validators/base')
const SongPayloadSchema = require('./schema')

/**
 * Song Validator
 *
 * @module validators/song
 */

/**
 * Represent the validator for song
 *
 * @memberof module:validators/song
 */
class SongValidator extends Validator {
  constructor () {
    super(SongPayloadSchema)
  }
}

module.exports = {
  SongValidator: new SongValidator()
}
