const Validator = require('~validators/base')
const AlbumPayloadSchema = require('./schema')

/**
 * Album Validator
 *
 * @module validators/album
 */
/**
 * Represent the validator for album.
 *
 * @memberof module:validators/album
 */
class AlbumValidator extends Validator {
  constructor () {
    super(AlbumPayloadSchema)
  }
}

module.exports = AlbumValidator
