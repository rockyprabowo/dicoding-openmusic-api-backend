const Validator = require('@validators/base')
const {
  PlaylistPayloadScheme,
  PlaylistSongPayloadScheme
} = require('./schema')

/**
 * Playlist Validator
 *
 * @module validators/playlist
 */

/**
 * Represent the validator for playlist
 *
 * @memberof module:validators/playlist
 */
class PlaylistValidator extends Validator {
  constructor () {
    super(PlaylistPayloadScheme)
  }
}
/**
 * Represent the validator for playlist song
 *
 * @memberof module:validators/playlist
 */
class PlaylistSongValidator extends Validator {
  constructor () {
    super(PlaylistSongPayloadScheme)
  }
}

module.exports = {
  PlaylistValidator: new PlaylistValidator(),
  PlaylistSongValidator: new PlaylistSongValidator()
}
