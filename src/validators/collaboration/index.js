const Validator = require('@validators/base')
const { CollaborationPayloadSchema } = require('./schema')

/**
 * Collaboration Validator
 *
 * @module validators/user
 */

/**
 * Represent the validator for Collaboration
 *
 * @memberof module:validators/user
 */
class CollaborationValidator extends Validator {
  constructor () {
    super(CollaborationPayloadSchema)
  }
}

module.exports = CollaborationValidator
