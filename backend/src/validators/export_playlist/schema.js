const Joi = require('joi')

/**
 * Represents the export playlist payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/export/playlist
 */
const ExportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({
    tlds: {
      allow: true
    }
  }).required()
})

module.exports = { ExportPlaylistPayloadSchema }
