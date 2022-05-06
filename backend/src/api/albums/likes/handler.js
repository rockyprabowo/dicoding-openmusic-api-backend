const { LifecycleMethod, ResponseObject } = require('~types/api')
const { AlbumsLikesPluginOptions } = require('~types/api/albums/likes')
const { JWTTokenPayload } = require('~types/utils/tokenise')

/**
 * Albums Likes Plugin - Route Handler
 *
 * @typedef {import('./routes')} AlbumRoutes
 * @typedef {import('@openmusic/common/data/album/album')} Album
 */

/**
 * Represents a class handling the {@link AlbumRoutes routes}
 *
 * @memberof module:api/albums/likes
 */
class AlbumsLikesHandler {
  #albumsLikesService

  /**
   * Construct a new {@link AlbumsLikesHandler} with {@link AlbumsPluginOptions}
   *
   * @param {AlbumsLikesPluginOptions} options Albums plugin options
   */
  constructor (options) {
    this.#albumsLikesService = options.albumsLikesService
  }

  /**
   * Handles `GET` request to fetch an {@link Album album} by its {@link Album.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getAlbumLikeCountByIdHandler = async (request, h) => {
    const { id: albumId } = request.params
    const { likes, __fromCache: cached } = await this.#albumsLikesService.getAlbumLikeCountById(albumId)

    return h.response({
      status: 'success',
      data: {
        likes
      }
    }).header('X-Data-Source', cached ? 'cache' : 'database')
  }

  /**
   * Handles `PUT` request to update an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postUserLikeAlbumByIdHandler = async (request, h) => {
    const { id: albumId } = request.params
    const { id: credentialId } = /** @type {JWTTokenPayload} */ (request.auth.credentials)

    const result = await this.#albumsLikesService.toggleUserLikeAlbumById(albumId, credentialId)

    return h.response({
      status: 'success',
      message: `Album ${albumId} ${result.liked ? 'liked' : 'disliked'}`
    }).code(201)
  }
}

module.exports = { AlbumsLikesHandler }
