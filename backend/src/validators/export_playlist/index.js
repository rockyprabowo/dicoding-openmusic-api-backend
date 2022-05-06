const Validator = require('~validators/base')
const ExportPayloadSchema = require('./schema')

/**
 * Export Playlist Validator
 *
 * @module validators/export
 */
/**
 * Represent the validator for export playlist.
 *
 * @memberof module:validators/export
 */
class ExportPlaylistValidator extends Validator {
  constructor () {
    super(ExportPayloadSchema)
  }
}

module.exports = ExportPlaylistValidator
