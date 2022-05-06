const Joi = require('joi')

const ExportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({
    tlds: {
      allow: true
    }
  }).required()
})

module.exports = ExportPlaylistPayloadSchema
