const Validator = require('~validators/base')
const ExportPayloadSchema = require('./schema')

/**
 * Export Validator
 *
 * @module validators/export
 */
/**
 * Represent the validator for export.
 *
 * @memberof module:validators/export
 */
class ExportValidator extends Validator {
  constructor () {
    super(ExportPayloadSchema)
  }
}

module.exports = ExportValidator
