const Validator = require('~validators/base')
const {
  UserRegistrationPayloadSchema,
  RefreshTokenPayloadSchema
} = require('./schema')

/**
 * Authentication Validator
 *
 * @module validators/authentication
 */

/**
 * Represent the validator for user registration
 *
 * @memberof module:validators/authentication
 */
class UserRegistrationValidator extends Validator {
  constructor () {
    super(UserRegistrationPayloadSchema)
  }
}

/**
 * Represent the validator for refresh token
 *
 * @memberof module:validators/authentication
 */
class RefreshTokenValidator extends Validator {
  constructor () {
    super(RefreshTokenPayloadSchema)
  }
}

module.exports = {
  UserRegistrationValidator: new UserRegistrationValidator(),
  RefreshTokenValidator: new RefreshTokenValidator()
}
