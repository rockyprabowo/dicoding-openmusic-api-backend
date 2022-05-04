const { LifecycleMethod, ResponseObject } = require('~types/api')
const { ExportsPluginOptions } = require('~types/api/exports')
const { ExportPlaylistRequestPayload } = require('@openmusic/common/types/data/export')

class ExportsHandler {
  producerService
  validator

  /**
   * Construct a new {@link ExportsHandler Exports Handler} with {@link ExportsPluginOptions options}
   *
   * @param {ExportsPluginOptions} options Exports plugin options
   */
  constructor (options) {
    this.producerService = options.producerService
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to send a export to email of a {@link Playlist playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  async postExportPlaylistHandler (request, h) {
    const payload = /** @type {ExportPlaylistRequestPayload} */ (request.payload)
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    this.validator.validate(payload)

    const message = {
      userId: credentialId,
      targetEmail: payload.targetEmail
    }

    await this.producerService.sendMessage('export:notes', JSON.stringify(message))

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean'
    })
    response.code(201)
    return response
  }
}

module.exports = { ExportsHandler }
