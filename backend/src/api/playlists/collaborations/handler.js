const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsCollaborationsPluginOptions } = require('~types/api/playlists/collaborations')
const { PlaylistCollaborationRequestPayload } = require('@openmusic/common/types/data/playlist_collaboration')

/**
 * Playlists Collaborations Plugin - Route Handler
 *
 * @typedef {import('./routes')} PlaylistsCollaborationsRoute
 * @typedef {import('@openmusic/common/data/playlist/playlist_collaboration')} PlaylistCollaboration
 */

/**
 * Represents a class handling the {@link PlaylistsCollaborationsRoute routes}
 *
 * @memberof module:api/playlists/collaborations
 */
class PlaylistsCollaborationsHandler {
  #playlistsCollaborationsService
  #playlistsService
  #validator

  /**
   * Construct a new {@link PlaylistsCollaborationsHandler} with {@link PlaylistsCollaborationsPluginOptions}
   *
   * @param {PlaylistsCollaborationsPluginOptions} options PlaylistCollaborations plugin options
   */
  constructor (options) {
    this.#playlistsCollaborationsService = options.playlistsCollaborationsService
    this.#playlistsService = options.playlistsService
    this.#validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link PlaylistCollaboration collaboration}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postCollaborationHandler = async (request, h) => {
    const payload = /** @type {PlaylistCollaborationRequestPayload} */ (request.payload)

    this.#validator.validate(payload)

    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)
    const { playlistId, userId } = payload

    await this.#playlistsService.verifyPlaylistOwner(playlistId, credentialId)

    const collaboration = await this.#playlistsCollaborationsService.addCollaboration(playlistId, userId)

    return h.response({
      status: 'success',
      message: 'Collaboration added',
      data: {
        collaborationId: collaboration.id
      }
    }).code(201)
  }

  /**
   * Handles `DELETE` request to delete a {@link PlaylistCollaboration collaboration}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deleteCollaborationHandler = async (request, h) => {
    const payload = /** @type {PlaylistCollaborationRequestPayload} */ (request.payload)

    this.#validator.validate(payload)

    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)
    const { playlistId, userId } = payload

    await this.#playlistsService.verifyPlaylistOwner(playlistId, credentialId)
    await this.#playlistsCollaborationsService.deleteCollaboration(playlistId, userId)

    return h.response({
      status: 'success',
      message: 'Collaboration deleted'
    })
  }
}

module.exports = { PlaylistsCollaborationsHandler }
