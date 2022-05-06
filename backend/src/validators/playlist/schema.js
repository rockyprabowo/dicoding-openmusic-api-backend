const Joi = require('joi')

/**
 * Represents the playlist payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/playlist
 */
const PlaylistPayloadScheme = Joi.object({
  name: Joi.string().required()
})

/**
 * Represents the playlist song payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/playlist
 */
const PlaylistSongPayloadScheme = Joi.object({
  songId: Joi.string().required()
})

module.exports = { PlaylistPayloadScheme, PlaylistSongPayloadScheme }
