const Joi = require('joi')

/**
 * Represents the Collaboration payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/collaboration
 */
const CollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required()
})

module.exports = { CollaborationPayloadSchema }
