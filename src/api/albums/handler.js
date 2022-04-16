/**
 * Albums Plugin - Handler class
 *
 * @module api/albums
 * @typedef {import('.').AlbumsPluginOptions} AlbumsPluginOptions
 * @typedef {import('@hapi/hapi').Request} Request
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 */

/**
 * Albums Plugin - Handler
 */
class AlbumsHandler {
  service
  validator
  /**
   * Album plugin handler
   *
   * @param {AlbumsPluginOptions} options Albums plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  // TODO: Implement AlbumsHandler

  /**
   * Handles `POST` request to add a new album.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  postAlbumHandler = (request, h) => {

  }

  /**
   * Handles `GET` request to fetch all album.
   *
   * @param {Request} request Request object Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  getAlbumsHandler = (request, h) => {

  }

  /**
   * Handles `GET` request to fetch an album by its `id`.
   *
   * @param {Request} request Request object Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  getAlbumByIdHandler = (request, h) => {

  }

  /**
   * Handles `PUT` request to update an album with `id`.
   *
   * @param {Request} request Request object Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  putAlbumByIdHandler = (request, h) => {

  }

  /**
   * Handles `DELETE` request to delete an album with `id`.
   *
   * @param {Request} request Request object Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  deleteAlbumByIdHandler = (request, h) => {

  }
}

module.exports = AlbumsHandler
