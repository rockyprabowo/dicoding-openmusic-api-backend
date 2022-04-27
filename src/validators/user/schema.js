const Joi = require('joi')

/**
 * Represents the User payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/user
 */
const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required()
})

module.exports = { UserPayloadSchema }
