const { LifecycleMethod, ResponseObject } = require('~types/api')
const { ExportsPlaylistsPluginOptions } = require('~types/api/exports')
const { ExportPlaylistRequestPayload, ExportPlaylistQueueMessage } = require('@openmusic/common/types/data/export_playlist')

class ExportsPlaylistsHandler {
  #producerService
  #playlistsService
  #validator

  /**
   * Construct a new {@link ExportsPlaylistsHandler Exports Handler} with {@link ExportsPlaylistsPluginOptions options}
   *
   * @param {ExportsPlaylistsPluginOptions} options Exports plugin options
   */
  constructor (options) {
    this.#producerService = options.producerService
    this.#playlistsService = options.playlistsService
    this.#validator = options.validator
  }

  /**
   * Handles `POST` request to send a export to email of a {@link Playlist playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postExportPlaylistHandler = async (request, h) => {
    const payload = /** @type {ExportPlaylistRequestPayload} */ (request.payload)

    this.#validator.validate(payload)

    const { targetEmail } = payload
    const { id: playlistId } = request.params
    const { id: userId } = /** @type {{id: string}} */ (request.auth.credentials)

    await this.#playlistsService.verifyPlaylistOwner(playlistId, userId)

    /** @type {ExportPlaylistQueueMessage} */
    const message = {
      targetEmail,
      userId,
      playlistId
    }

    await this.#producerService.sendMessage('export:playlist', JSON.stringify(message))

    return h.response({
      status: 'success',
      message: `Export playlist ${playlistId} to e-mail ${targetEmail} queued`
    }).code(201)
  }
}

module.exports = { ExportsPlaylistsHandler }
