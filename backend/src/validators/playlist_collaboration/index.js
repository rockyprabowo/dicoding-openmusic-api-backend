const Validator = require('~validators/base')
const { PlaylistCollaborationPayloadSchema } = require('./schema')

/**
 * Playlist Collaboration Validator
 *
 * @module validators/user
 */

/**
 * Represent the validator for PlaylistCollaboration
 *
 * @memberof module:validators/user
 */
class PlaylistCollaborationValidator extends Validator {
  constructor () {
    super(PlaylistCollaborationPayloadSchema)
  }
}

module.exports = PlaylistCollaborationValidator
