const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema
} = require('./schema')
const InvariantError = require('@exceptions/invariant_error')
const Validator = require('@validators/base')

/**
 * Represent the validator for {@link Authentication}.
 *
 * @augments Validator
 */
class PostAuthenticationValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link PostAuthenticationPayloadSchema}
   *
   * @param {object} payload Object payload
   * @override
   */
  validate = (payload) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
    return validationResult
  }
}

class PutAuthenticationValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link PutAuthenticationPayloadSchema}
   *
   * @param {object} payload Object payload
   * @override
   */
  validate = (payload) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
    return validationResult
  }
}

class DeleteAuthenticationValidator extends Validator {
  /**
   * Validates the {@link payload} against {@link DeleteAuthenticationPayloadSchema}
   *
   * @param {object} payload Object payload
   * @override
   */
  validate = (payload) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
    return validationResult
  }
}

module.exports = { PostAuthenticationValidator, PutAuthenticationValidator, DeleteAuthenticationValidator }
