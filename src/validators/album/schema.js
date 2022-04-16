const Joi = require('joi')

/**
 * Represents the {@link Album} payload schema
 *
 * @typedef {import('../../data/album/album')} Album
 * @type {Joi.ObjectSchema}
 */
const AlbumPayloadSchema = Joi.object({
  // TODO: Album payload schema
})

module.exports = AlbumPayloadSchema
