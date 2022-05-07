const { LifecycleMethod, ResponseObject } = require('~types/api')
const { AlbumCoverArtPluginOptions } = require('~types/api/albums')
const { AlbumCoverArtRequestPayload } = require('@openmusic/common/types/data/album_cover_art')
const LocalStorageService = require('~services/local_storage/local_storage_service')

/**
 * Album Cover Art Plugin - Handler class
 *
 * @typedef {import('./routes')} AlbumCoverArtRoutes
 * @typedef {import('@openmusic/common/data/album/album') } Album
 */

/**
 * Represents a class handling the {@link AlbumCoverArtRoutes routes}
 *
 * @memberof module:api/albums/cover_art
 */
class AlbumCoverArtHandler {
  #albumsService
  #storageService
  #validator

  get directory () {
    if (this.#storageService instanceof LocalStorageService) {
      return this.#storageService.directory
    }
  }

  /**
   * Construct a new {@link AlbumCoverArtHandler Album CoverArt Handler} with {@link AlbumCoverArtPluginOptions options}
   *
   * @param {AlbumCoverArtPluginOptions} options Album plugin options
   */
  constructor (options) {
    this.#albumsService = options.albumsService
    this.#storageService = options.storageService
    this.#validator = options.validator
  }

  /**
   * Handles `POST` request to upload album cover art
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postAlbumCoverArtById = async (request, h) => {
    const { id: albumId } = request.params
    const payload = /** @type {AlbumCoverArtRequestPayload} */ (request.payload)

    this.#validator.validate(payload.cover.hapi.headers)

    const albumData = await this.#albumsService.getAlbumById(albumId)

    const { cover } = payload

    const fileFormat = require('path').extname(cover.hapi.filename)
    const finalFileName = `${albumData.album.id}-cover${fileFormat}`
    const url = await this.#storageService.writeFile(cover, cover.hapi, finalFileName)
    const result = await this.#albumsService.editAlbumCoverArtById(albumId, url)

    return h.response({
      status: 'success',
      message: `Cover art for ${result.id} uploaded`
    }).code(201)
  }
}

module.exports = { AlbumCoverArtHandler }
