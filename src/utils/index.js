const { LifecycleMethod } = require('~types/api')
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
 */
exports.genericPreResponseHandler = (request, h) => {
  const response = request.response

  if (response instanceof Error) {
    // Specific error
    if (response instanceof ClientError) {
      return h.response({
        status: 'error',
        message: response.message
      }).code(response.statusCode)
    }
    // Unexpected error
    return h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.',
      debug: (process.env.NODE_ENV !== 'production' ? { ...response } : {})
    })
  }

  // Continue
  return h.continue
}
