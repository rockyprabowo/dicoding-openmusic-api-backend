const Joi = require('joi')

/**
 * @typedef {import('@data/song/song')} Song
 */

/**
 * Represents the {@link Song} payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/song
 */
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string()
})

module.exports = SongPayloadSchema
