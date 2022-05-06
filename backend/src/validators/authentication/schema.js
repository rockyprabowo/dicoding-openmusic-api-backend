const Joi = require('joi')

/**
 * Represents the user registration payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/authentication
 */
const UserRegistrationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

/**
 * Represents the refresh token payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/authentication
 */
const RefreshTokenPayloadSchema = Joi.object({
  refreshToken: Joi.string().required()
})

module.exports = {
  UserRegistrationPayloadSchema,
  RefreshTokenPayloadSchema
}
