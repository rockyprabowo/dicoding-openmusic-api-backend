const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { PlaylistRequestPayload, PlaylistSongRequestPayload } = require('~types/data/playlist')

/**
 * Playlists Plugin - Handler class
 *
 * @typedef {import('./routes')} PlaylistRoutes
 * @typedef {import('@data/playlist/playlist') } Playlist
 */

/**
 * Represents a class handling the {@link PlaylistRoutes routes}
 *
 * @memberof module:api/playlists
 */
class PlaylistsHandler {
  service
  validator
  /**
   * Construct a new {@link PlaylistsHandler Playlists Handler} with {@link PlaylistsPluginOptions options}
   *
   * @param {PlaylistsPluginOptions} options Playlists plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link Playlist playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postPlaylistHandler = async (request, h) => {
    const payload = /** @type {PlaylistRequestPayload} */ (request.payload)
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    this.validator.PlaylistValidator.validate(payload)

    const { name } = payload

    const playlist = await this.service.addPlaylist({ name, ownerId: credentialId })

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
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const playlists = await this.service.getPlaylists(credentialId)

    return h.response({
      status: 'success',
      data: { playlists }
    })
  }

  /**
   * Handles `DELETE` request to delete an {@link Playlist playlist} with {@link Playlist.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deletePlaylistByIdHandler = async (request, h) => {
    const { id: playlistId } = request.params
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    await this.service.deletePlaylistById(playlistId, credentialId)

    return h.response({
      status: 'success',
      message: 'Playlist deleted successfully'
    })
  }

  /**
   * Handles `GET` request to fetch a {@link Playlist playlist} by its {@link Playlist.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getPlaylistSongsByIdHandler = async (request, h) => {
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const { id: playlistId } = request.params
    const playlist = await this.service.getPlaylistById(playlistId, credentialId)

    return h.response({
      status: 'success',
      data: { playlist }
    })
  }

  /**
   * Handles `POST` request to add a {@link Song song} to a {@link Playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postPlaylistSongByIdHandler = async (request, h) => {
    const { id: playlistId } = request.params
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const payload = /** @type {PlaylistSongRequestPayload} */ (request.payload)

    this.validator.PlaylistSongValidator.validate(payload)

    const { songId } = payload

    await this.service.addPlaylistSong(playlistId, credentialId, { songId })

    return h.response({
      status: 'success',
      message: 'Playlist updated successfully'
    }).code(201)
  }

  /**
   * Handles `POST` request to add a {@link Song song} to a {@link Playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deletePlaylistSongByIdHandler = async (request, h) => {
    const { id: playlistId } = request.params
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const payload = /** @type {PlaylistSongRequestPayload} */ (request.payload)

    this.validator.PlaylistSongValidator.validate(payload)

    const { songId } = payload

    await this.service.deletePlaylistSong(playlistId, credentialId, { songId })

    return h.response({
      status: 'success',
      message: 'Playlist updated successfully'
    })
  }
}

module.exports = { PlaylistsHandler }
