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
  name: Joi.string().required(),
  year: Joi.number().required()
})

module.exports = AlbumPayloadSchema
