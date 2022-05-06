const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { PlaylistRequestPayload } = require('@openmusic/common/types/data/playlist')
const { JWTTokenPayload } = require('~types/utils/tokenise')

/**
 * Playlists Plugin - Handler class
 *
 * @typedef {import('./routes')} PlaylistRoutes
 * @typedef {import('@openmusic/common/data/playlist/playlist') } Playlist
 * @typedef {import('@openmusic/common/data/song/song') } Song
 * @typedef {import('@openmusic/common/data/playlist/playlist_activities').PlaylistActivities } PlaylistActivities
 */

/**
 * Represents a class handling the {@link PlaylistRoutes routes}
 *
 * @memberof module:api/playlists
 */
class PlaylistsHandler {
  playlistsService
  validators

  /**
   * Construct a new {@link PlaylistsHandler Playlists Handler} with {@link PlaylistsPluginOptions options}
   *
   * @param {PlaylistsPluginOptions} options Playlists plugin options
   */
  constructor (options) {
    this.playlistsService = options.playlistsService
    this.validators = options.validators
  }

  /**
   * Handles `POST` request to add a new {@link Playlist playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postPlaylistHandler = async (request, h) => {
    const payload = /** @type {PlaylistRequestPayload} */ (request.payload)
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

    this.validators.PlaylistValidator.validate(payload)

    const { name } = payload

    const playlist = await this.playlistsService.addPlaylist({ name, ownerId: credentialId })

    return h.response({
      status: 'success',
      message: 'Playlist added successfully',
      data: {
        playlistId: playlist.id
      }
    }).code(201)
  }

  /**
   * Handles `GET` request to fetch all playlists.
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getPlaylistsHandler = async (request, h) => {
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

    const playlists = await this.playlistsService.getPlaylists(credentialId)

    return h.response({
      status: 'success',
      data: { playlists }
    })
  }

  /**
   * Handles `DELETE` request to delete a {@link Playlist playlist} with {@link Playlist.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deletePlaylistByIdHandler = async (request, h) => {
    const { id: playlistId } = request.params
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

    await this.playlistsService.deletePlaylistById(playlistId, credentialId)

    return h.response({
      status: 'success',
      message: 'Playlist deleted successfully'
    })
  }
}

module.exports = { PlaylistsHandler }
