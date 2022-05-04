const { LifecycleMethod, ResponseObject } = require('~types/api')
const { AlbumsPluginOptions } = require('~types/api/albums')
const { AlbumRequestPayload } = require('@openmusic/common/types/data/album/index')

/**
 * Albums Plugin - Route Handler
 *
 * @typedef {import('./routes')} AlbumRoutes
 * @typedef {import('@openmusic/common/src/data/album/album')} Album
 */

/**
 * Represents a class handling the {@link AlbumRoutes routes}
 *
 * @memberof module:api/albums
 */
class AlbumsHandler {
  albumsService
  validator
  /**
   * Construct a new {@link AlbumsHandler} with {@link AlbumsPluginOptions}
   *
   * @param {AlbumsPluginOptions} options Albums plugin options
   */
  constructor (options) {
    this.albumsService = options.albumsService
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link Album album}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postAlbumHandler = async (request, h) => {
    const payload = /** @type {AlbumRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { name, year } = payload

    const album = await this.albumsService.addAlbum({ name, year })

    return h.response({
      status: 'success',
      message: 'Album added successfully',
      data: {
        albumId: album.id
      }
    }).code(201)
  }

  /**
   * Handles `GET` request to fetch all {@link Album album}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getAlbumsHandler = async (request, h) => {
    const albums = await this.albumsService.getAlbums()

    return h.response({
      status: 'success',
      data: { albums }
    })
  }

  /**
   * Handles `GET` request to fetch an {@link Album album} by its {@link Album.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getAlbumByIdHandler = async (request, h) => {
    const { id } = request.params
    const album = await this.albumsService.getAlbumById(id)

    return h.response({
      status: 'success',
      data: { album }
    })
  }

  /**
   * Handles `PUT` request to update an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  putAlbumByIdHandler = async (request, h) => {
    const { id } = request.params
    const payload = /** @type {AlbumRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { name, year } = payload

    await this.albumsService.editAlbumById(id, { name, year })

    return h.response({
      status: 'success',
      message: 'Album updated successfully'
    })
  }

  /**
   * Handles `DELETE` request to delete an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deleteAlbumByIdHandler = async (request, h) => {
    const { id } = request.params

    await this.albumsService.deleteAlbumById(id)

    return h.response({
      status: 'success',
      message: 'Album deleted successfully'
    })
  }
}

module.exports = { AlbumsHandler }
