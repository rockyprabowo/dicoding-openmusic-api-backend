const { LifecycleMethod } = require('~types/api')
const { AlbumsPluginOptions } = require('~types/api/albums')
const { AlbumRequestPayload } = require('~types/data/album')

/**
 * Albums Plugin - Route Handler
 *
 * @typedef {import('./routes')} AlbumRoutes
 * @typedef {import('@data/album/album')} Album
 */

/**
 * Represents a class handling the {@link AlbumRoutes routes}
 *
 * @memberof module:api/albums
 */
class AlbumsHandler {
  service
  validator
  /**
   * Construct a new {@link AlbumsHandler} with {@link AlbumsPluginOptions}
   *
   * @param {AlbumsPluginOptions} options Albums plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link Album album}
   *
   * @type {LifecycleMethod}
   */
  postAlbumHandler = async (request, h) => {
    const payload = /** @type {AlbumRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { name, year } = payload

    const album = await this.service.addAlbum({ name, year })

    return h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId: album.id
      }
    }).code(201)
  }

  /**
   * Handles `GET` request to fetch all {@link Album album}
   *
   * @type {LifecycleMethod}
   */
  getAlbumsHandler = async (request, h) => {
    const albums = await this.service.getAlbums()

    return h.response({
      status: 'success',
      data: { albums }
    })
  }

  /**
   * Handles `GET` request to fetch an {@link Album album} by its {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  getAlbumByIdHandler = async (request, h) => {
    const { id } = request.params
    const album = await this.service.getAlbumById(id)

    return h.response({
      status: 'success',
      data: { album }
    })
  }

  /**
   * Handles `PUT` request to update an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  putAlbumByIdHandler = async (request, h) => {
    const { id } = request.params
    const payload = /** @type {AlbumRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { name, year } = /** @type {AlbumRequestPayload} */ (payload)

    await this.service.editAlbumById(id, { name, year })

    return h.response({
      status: 'success',
      message: 'Album berhasil diperbarui'
    })
  }

  /**
   * Handles `DELETE` request to delete an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  deleteAlbumByIdHandler = async (request, h) => {
    const { id } = request.params

    await this.service.deleteAlbumById(id)

    return h.response({
      status: 'success',
      message: 'Album berhasil dihapus'
    })
  }
}

module.exports = { AlbumsHandler }
