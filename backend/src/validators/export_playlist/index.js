const Validator = require('~validators/base')
const { ExportPlaylistPayloadSchema } = require('./schema')

/**
 * Export Playlist Validator
 *
 * @module validators/export/playlist
 */
/**
 * Represent the validator for export playlist.
 *
 * @memberof module:validators/export/playlist
 */
class ExportPlaylistValidator extends Validator {
  constructor () {
    super(ExportPlaylistPayloadSchema)
  }
}

module.exports = ExportPlaylistValidator
