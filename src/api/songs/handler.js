/**
 * Songs Plugin - Handler class
 *
 * @module api/songs
 * @typedef {import('.').SongsPluginOptions} SongsPluginOptions
 * @typedef {import('@hapi/hapi').Request} Request
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 */

/**
 * Songs Plugin - Handler
 */
class SongsHandler {
  /**
   * Album plugin handler
   *
   * @param {SongsPluginOptions} options Songs plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  // TODO: Implement SongsHandler

  /**
   * Handles `POST` request to add a new song.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  postSongHandler = (request, h) => {}

  /**
   * Handles `GET` request to fetch all songs.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  getSongsHandler = (request, h) => {}

  /**
   * Handles `GET` request to fetch a song by its id.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  getSongByIdHandler = (request, h) => {}

  /**
   * Handles `PUT` request to update a song with `id`.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  putSongByIdHandler = (request, h) => {}

  /**
   * Handles `DELETE` request to delete an album with `id`.
   *
   * @param {Request} request Request object
   * @param {ResponseToolkit} h Response toolkit
   */
  deleteSongByIdHandler = (request, h) => {}
}

module.exports = { SongsHandler }
