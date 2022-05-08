const { LifecycleMethod, ResponseObject } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { JWTTokenPayload } = require('~types/utils/tokenise')

/**
 * Playlists Activities Plugin - Handler class
 *
 */

/**
 * @typedef {import('./routes')} PlaylistsActivitiesRoutes
 * @typedef {import('@openmusic/common/data/playlist/playlist') } Playlist
 * @typedef {import('@openmusic/common/data/playlist/playlist_activities').PlaylistActivities } PlaylistActivities
 */

/**
 * Represents a class handling the {@link PlaylistsActivitiesRoutes routes}
 *
 * @memberof module:api/playlists/activities
 */
class PlaylistsActivitiesHandler {
  #playlistsService

  /**
   * Construct a new {@link PlaylistsActivitiesHandler Playlists Activities Handler} with {@link PlaylistsPluginOptions options}
   *
   * @param {PlaylistsPluginOptions} options Playlists plugin options
   */
  constructor (options) {
    this.#playlistsService = options.playlistsService
  }

  /**
   * Handles `GET` request to get {@link PlaylistActivities playlist activities}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getPlaylistActivitiesById = async (request, h) => {
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)
    const { id: playlistId } = request.params

    const { playlistActivities, __fromCache: cached } = await this.#playlistsService.getPlaylistActivities(playlistId, credentialId)

    return h.response({
      status: 'success',
      data: playlistActivities
    }).header('X-Data-Source', cached ? 'cache' : 'database')
  }
}

module.exports = { PlaylistsActivitiesHandler }
