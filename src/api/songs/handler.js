const NotImplementedError = require('../../exceptions/not_implemented_error')
const { LifecycleMethod } = require('../_types')
const { SongsPluginOptions } = require('./_types')

/**
 * Songs Plugin - Handler class
 *
 * @typedef {import('./routes')} SongRoutes
 * @typedef {import('../../data/song/song')} Song
 */

/**
 * Represents a class handling the {@link SongRoutes routes}
 *
 * @memberof module:api/songs
 */
class SongsHandler {
  service
  validator
  /**
   * Construct a new {@link SongsHandler Songs Handler} with {@link SongsPluginOptions options}
   *
   * @param {SongsPluginOptions} options Songs plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  // TODO: Implement SongsHandler

  /**
   * Handles `POST` request to add a new {@link Song song}
   *
   * @type {LifecycleMethod}
   */
  postSongHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `GET` request to fetch all songs.
   *
   * @type {LifecycleMethod}
   */
  getSongsHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `GET` request to fetch a {@link Song song} by its {@link Song.id id
   *
   * @type {LifecycleMethod}
   */
  getSongByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `PUT` request to update a {@link Song song} with {@link Song.id id}
   *
   * @type {LifecycleMethod}
   */
  putSongByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }

  /**
   * Handles `DELETE` request to delete an {@link Song song} with {@link Song.id id}
   *
   * @type {LifecycleMethod}
   */
  deleteSongByIdHandler = (request, h) => {
    throw new NotImplementedError()
  }
}

module.exports = { SongsHandler }
