const Joi = require('joi')

/**
 * Represents the {@link Song} payload schema
 *
 * @typedef {import('../../data/song/song')} Song
 * @type {Joi.ObjectSchema}
 */
const SongPayloadSchema = Joi.object({
  // TODO: Song payload schema
})

module.exports = SongPayloadSchema
