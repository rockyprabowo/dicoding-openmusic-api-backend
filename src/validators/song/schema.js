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
  // TODO: Song payload schema
})

module.exports = SongPayloadSchema
