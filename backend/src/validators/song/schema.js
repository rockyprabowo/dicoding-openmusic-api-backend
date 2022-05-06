const Joi = require('joi')

/**
 * Represents the song payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/song
 */
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().min(1900).max(2022).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string()
})

module.exports = SongPayloadSchema
