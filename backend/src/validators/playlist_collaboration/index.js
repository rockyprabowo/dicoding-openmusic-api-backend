const Validator = require('~validators/base')
const { PlaylistCollaborationPayloadSchema } = require('./schema')

/**
 * Playlist Collaboration Validator
 *
 * @module validators/playlist/collaboration
 */

/**
 * Represent the validator for Playlist Collaboration
 *
 * @memberof module:validators/playlist/collaboration
 */
class PlaylistCollaborationValidator extends Validator {
  constructor () {
    super(PlaylistCollaborationPayloadSchema)
  }
}

module.exports = PlaylistCollaborationValidator
