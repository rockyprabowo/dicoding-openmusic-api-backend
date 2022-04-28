const { LifecycleMethod, ResponseObject } = require('~types/api')
const { SongsPluginOptions } = require('~types/api/songs')
const { SongRequestPayload } = require('~types/data/song')

/**
 * Songs Plugin - Handler class
 *
 * @typedef {import('./routes')} SongRoutes
 * @typedef {import('@data/song/song')} Song
 */

/**
 * Represents a class handling the {@link SongRoutes routes}
 *
 * @memberof module:api/songs
 */
class SongsHandler {
  songsService
  validator
  /**
   * Construct a new {@link SongsHandler Songs Handler} with {@link SongsPluginOptions options}
   *
   * @param {SongsPluginOptions} options Songs plugin options
   */
  constructor (options) {
    this.songsService = options.songsService
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link Song song}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postSongHandler = async (request, h) => {
    const payload = /** @type {SongRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { title, year, performer, genre, duration, albumId } = payload

    const song = await this.songsService.addSong({ title, year, performer, genre, duration, albumId })

    return h.response({
      status: 'success',
      message: 'Song added successfully',
      data: {
        songId: song.id
      }
    }).code(201)
  }

  /**
   * Handles `GET` request to fetch all songs.
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getSongsHandler = async (request, h) => {
    const { performer, title } = request.query
    const songs = await this.songsService.getSongs({ performer, title })

    return h.response({
      status: 'success',
      data: { songs }
    })
  }

  /**
   * Handles `GET` request to fetch a {@link Song song} by its {@link Song.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getSongByIdHandler = async (request, h) => {
    const { id } = request.params
    const song = await this.songsService.getSongById(id)

    return h.response({
      status: 'success',
      data: { song }
    })
  }

  /**
   * Handles `PUT` request to update a {@link Song song} with {@link Song.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  putSongByIdHandler = async (request, h) => {
    const { id } = request.params
    const payload = /** @type {SongRequestPayload} */ (request.payload)

    this.validator.validate(payload)

    const { title, genre, performer, year, duration, albumId } = payload

    await this.songsService.editSongById(id, { title, genre, performer, year, duration, albumId })

    return h.response({
      status: 'success',
      message: 'Song updated successfully'
    })
  }

  /**
   * Handles `DELETE` request to delete an {@link Song song} with {@link Song.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  deleteSongByIdHandler = async (request, h) => {
    const { id } = request.params

    await this.songsService.deleteSongById(id)

    return h.response({
      status: 'success',
      message: 'Song deleted successfully'
    })
  }
}

module.exports = { SongsHandler }
