const { LifecycleMethod, ResponseObject } = require('~types/api')
const ClientError = require('@exceptions/client_error')

/**
 * Utilities
 *
 * @module utils
 */

/**
 * Generic `onPreResponse` handler
 *
 * @type {LifecycleMethod}
 * @returns {(ResponseObject | symbol)} Response
 */
exports.genericPreResponseHandler = (request, h) => {
  const response = request.response

  if (response instanceof Error) {
    // Specific error
    if (response instanceof ClientError) {
      return h.response({
        status: 'fail',
        message: response.message
      }).code(response.statusCode)
    }

    // For non 5xx errors, pass to default Hapi behaviour
    if (!response.isServer) {
      return h.continue
    }

    // Unexpected error
    return h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
      ...(process.env.NODE_ENV !== 'production') && { detail: { ...response } }
    }).code(500)
  }

  // Continue
  return h.continue
}

/**
 * Prints ASCII Art Logo to console
 *
 */
exports.printAsciiArtLogo = () => {
  console.log(require('./ascii_art.json').projectNameArt)
}
