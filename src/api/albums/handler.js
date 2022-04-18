const NotImplementedError = require('../../exceptions/not_implemented_error')
const { LifecycleMethod } = require('../_types')
const { AlbumsPluginOptions } = require('./_types')

/**
 * Albums Plugin - Route Handler
 *
 * @typedef {import('./routes')} AlbumRoutes
 * @typedef {import('../../data/album/album')} Album
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

  // TODO: Implement AlbumsHandler

  /**
   * Handles `POST` request to add a new {@link Album album}
   *
   * @type {LifecycleMethod}
   */
  postAlbumHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `GET` request to fetch all {@link Album album}
   *
   * @type {LifecycleMethod}
   */
  getAlbumsHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `GET` request to fetch an {@link Album album} by its {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  getAlbumByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `PUT` request to update an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  putAlbumByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `DELETE` request to delete an {@link Album album} with {@link Album.id id}
   *
   * @type {LifecycleMethod}
   */
  deleteAlbumByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }
}

module.exports = { AlbumsHandler }
