const Joi = require('joi')

/**
 * Represents the album payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/album
 */
const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required()
})

module.exports = AlbumPayloadSchema
