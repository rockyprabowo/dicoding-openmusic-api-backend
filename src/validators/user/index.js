const InvariantError = require('@exceptions/invariant_error')
const Validator = require('@validators/base')
const { UserPayloadSchema } = require('./schema')

class UserValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link UserPayloadSchema}
   *
   * @param {object} payload Object payload
   * @override
   */
  validate = (payload) => {
    const validationResult = UserPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = UserValidator
