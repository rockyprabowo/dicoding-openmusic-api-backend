const Joi = require('joi')

/**
 * @typedef {import('@data/album/album')} Album
 */

/**
 * Represents the {@link Album} payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/album
 */
const AlbumPayloadSchema = Joi.object({
  // TODO: Album payload schema
})

module.exports = AlbumPayloadSchema
