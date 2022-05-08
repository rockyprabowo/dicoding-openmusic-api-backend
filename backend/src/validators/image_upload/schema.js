const Joi = require('joi')

/**
 * Represents the image headers payload schema.
 *
 * @type {Joi.ObjectSchema}
 * @memberof module:validators/image_upload
 */
const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required()
}).unknown()

module.exports = { ImageHeadersSchema }
