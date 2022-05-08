const Validator = require('~validators/base')
const { ImageHeadersSchema } = require('./schema')

/**
 * Image Upload Validator
 *
 * @module validators/image_upload
 */
/**
 * Represent the validator for image upload.
 *
 * @memberof module:validators/image_upload
 */
class ImageUploadValidator extends Validator {
  constructor () {
    super(ImageHeadersSchema)
  }
}

module.exports = ImageUploadValidator
