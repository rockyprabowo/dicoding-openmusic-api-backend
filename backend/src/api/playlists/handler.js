const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { PlaylistRequestPayload, PlaylistSongRequestPayload } = require('@openmusic/common/types/data/playlist/index')

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
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

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
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

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
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    await this.playlistsService.deletePlaylistById(playlistId, credentialId)

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
    const playlist = await this.playlistsService.getPlaylistById(playlistId, credentialId)

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

    this.validators.PlaylistSongValidator.validate(payload)

    const { songId } = payload

    await this.playlistsService.addPlaylistSong(playlistId, credentialId, { songId })

    return h.response({
      status: 'success',
      message: 'Playlist updated successfully'
    }).code(201)
  }

  /**
   * Handles `DELETE` request to add a {@link Song song} to a {@link Playlist}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deletePlaylistSongByIdHandler = async (request, h) => {
    const { id: playlistId } = request.params
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const payload = /** @type {PlaylistSongRequestPayload} */ (request.payload)

    this.validators.PlaylistSongValidator.validate(payload)

    const { songId } = payload

    await this.playlistsService.deletePlaylistSong(playlistId, credentialId, { songId })

    return h.response({
      status: 'success',
      message: 'Playlist updated successfully'
    })
  }

  /**
   * Handles `GET` request to get {@link PlaylistActivities playlist activities}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getPlaylistActivitiesById = async (request, h) => {
    const { id: credentialId } = /** @type {{id: string}} */ (request.auth.credentials)

    const { id: playlistId } = request.params
    const playlistActivities = await this.playlistsService.getPlaylistActivities(playlistId, credentialId)

    return h.response({
      status: 'success',
      data: playlistActivities
    })
  }
}

module.exports = { PlaylistsHandler }
