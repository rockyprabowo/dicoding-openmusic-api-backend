const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { PlaylistSongRequestPayload } = require('@openmusic/common/types/data/playlist')
const { JWTTokenPayload } = require('~types/utils/tokenise')

/**
 * Playlists Songs Plugin - Handler class
 *
 * @typedef {import('./routes')} PlaylistsSongsRoutes
 * @typedef {import('@openmusic/common/data/playlist/playlist') } Playlist
 * @typedef {import('@openmusic/common/data/song/song') } Song
 */

/**
 * Represents a class handling the {@link PlaylistsSongsRoutes routes}
 *
 * @memberof module:api/playlists/songs
 */
class PlaylistsSongsHandler {
  playlistsService
  validators

  /**
   * Construct a new {@link PlaylistsSongsHandler Playlists Handler} with {@link PlaylistsPluginOptions options}
   *
   * @param {PlaylistsPluginOptions} options Playlists plugin options
   */
  constructor (options) {
    this.playlistsService = options.playlistsService
    this.validators = options.validators
  }

  /**
   * Handles `GET` request to fetch a {@link Playlist playlist} by its {@link Playlist.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getPlaylistSongsByIdHandler = async (request, h) => {
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

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
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

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
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

    const payload = /** @type {PlaylistSongRequestPayload} */ (request.payload)

    this.validators.PlaylistSongValidator.validate(payload)

    const { songId } = payload

    await this.playlistsService.deletePlaylistSong(playlistId, credentialId, { songId })

    return h.response({
      status: 'success',
      message: 'Playlist updated successfully'
    })
  }
}

module.exports = { PlaylistsSongsHandler }
