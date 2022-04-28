const { LifecycleMethod, ResponseObject } = require('~types/api')
const { CollaborationsPluginOptions } = require('~types/api/collaborations')
const { CollaborationRequestPayload } = require('~types/data/collaboration')

/**
 * Collaborations Plugin - Route Handler
 *
 * @typedef {import('./routes')} CollaborationsRoute
 * @typedef {import('@data/collaboration/collaboration')} Collaboration
 */

/**
 * Represents a class handling the {@link CollaborationsRoute routes}
 *
 * @memberof module:api/collaborations
 */
class CollaborationsHandler {
  collaborationsService
  playlistsService
  validator

  /**
   * Construct a new {@link CollaborationsHandler} with {@link CollaborationsPluginOptions}
   *
   * @param {CollaborationsPluginOptions} options Collaborations plugin options
   */
  constructor (options) {
    this.collaborationsService = options.collaborationsService
    this.playlistsService = options.playlistsService
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link Collaboration collaboration}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postCollaborationHandler = async (request, h) => {
    const payload = /** @type {CollaborationRequestPayload} */ (request.payload)
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)
    const { playlistId, userId } = payload

    this.validator.validate(payload)
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId)

    const collaboration = await this.collaborationsService.addCollaboration(playlistId, userId)

    return h.response({
      status: 'success',
      message: 'Collaboration added',
      data: {
        collaborationId: collaboration.id
      }
    }).code(201)
  }

  /**
   * Handles `DELETE` request to delete a {@link Collaboration collaboration}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deleteCollaborationHandler = async (request, h) => {
    const payload = /** @type {CollaborationRequestPayload} */ (request.payload)
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)
    const { playlistId, userId } = payload

    this.validator.validate(payload)
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId)
    await this.collaborationsService.deleteCollaboration(playlistId, userId)

    return h.response({
      status: 'success',
      message: 'Collaboration deleted'
    })
  }
}

module.exports = { CollaborationsHandler }
