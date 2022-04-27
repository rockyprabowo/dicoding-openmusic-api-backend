const Validator = require('@validators/base')
const { UserPayloadSchema } = require('./schema')

/**
 * User Validator
 *
 * @module validators/user
 */

/**
 * Represent the validator for User
 *
 * @memberof module:validators/user
 */
class UserValidator extends Validator {
  constructor () {
    super(UserPayloadSchema)
  }
}

module.exports = {
  UserValidator: new UserValidator()
}
