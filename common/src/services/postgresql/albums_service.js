const PostgresBase = require('./base')
const SongsService = require('./songs_service')
const CacheService = require('../redis/cache_service')
const Album = require('../../data/album/album')
const {
  AlbumRequestPayload,
  CacheableAlbumCollection,
  CacheableAlbum
} = require('../../types/data/album')
const { QueryConfig } = require('../../types/services/postgresql')
const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')

/**
 * OpenMusic API - Albums Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/albums
 */

/**
 * Represents a service class related to {@link Album}.
 *
 */
class AlbumsService extends PostgresBase {
  #cacheService
  #songsService

  /**
   * Construct an {@link AlbumsService}
   *
   * @param {CacheService} cacheService Cache Service
   * @param {SongsService} songsService Songs Service
   */
  constructor (cacheService, songsService) {
    super()
    this.#cacheService = cacheService
    this.#songsService = songsService
  }

  albumsCacheKey = 'albums'

  /**
   * Album cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  albumCacheKey = (id) => (`albums:${id}`)

  /**
   * Album songs cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  albumSongsCacheKey = (id) => (`albums:${id}:songs`)

  /**
   * Adds an {@link Album} into database.
   *
   * @param {AlbumRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted Album {@link Album.id id}
   * @async
   */
  addAlbum = async (payload) => {
    const album = new Album(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${Album.tableName} (id, name, year) VALUES ($1, $2, $3) RETURNING id`,
      values: [album.id, album.name, album.year]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add new album failed')
    }

    await this.#cacheService.delete(this.albumsCacheKey)

    return result.rows[0]
  }

  /**
   * Get an {@link Album} by its {@link Album.id id} from database.
   *
   * @param {string} id Album {@link Album.id id}
   * @returns {Promise<CacheableAlbum>} Album
   * @async
   */
  getAlbumById = async (id) => {
    const { album, __fromCache: albumCached } = await this.getAlbumInformationById(id)
    const { songs, __fromCache: songsCached } = await this.#songsService.getSongs({ albumId: album.id })

    album.songs = songs

    return {
      album,
      __fromCache: albumCached && songsCached
    }
  }

  /**
   * Get all {@link Album} from database.
   *
   * @returns {Promise<CacheableAlbumCollection>} Albums
   * @async
   */
  getAlbums = async () => {
    try {
      const cachedAlbums = await this.#cacheService.get(this.albumsCacheKey)
      return {
        albums: JSON.parse(cachedAlbums),
        __fromCache: true
      }
    } catch (error) {
      const queryResult = await this.db.query(
        `SELECT * FROM ${Album.tableName}`
      )

      const albums = queryResult.rows.map(Album.mapDBToModel)

      await this.#cacheService.set(this.albumsCacheKey, JSON.stringify(albums), 60 * 30)

      return {
        albums,
        __fromCache: false
      }
    }
  }

  /**
   * Edit an {@link Album} with {@link Album.id id} from database.
   *
   * @param {string} id Album {@link Album.id id}
   * @param {AlbumRequestPayload} payload Request Payload
   * @returns {Promise<{id: string}>} Updated Album {@link Album.id id}
   * @async
   */
  editAlbumById = async (id, payload) => {
    const query = {
      text: `UPDATE ${Album.tableName} SET name = $1, year = $2 WHERE id = $3 RETURNING id`,
      values: [payload.name, payload.year, id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Album ${id} update failed. Can't find an album with id ${id}`)
    }

    await this.#cacheService.delete(this.albumsCacheKey)
    await this.#cacheService.delete(this.albumCacheKey(id))

    return result.rows[0]
  }

  /**
   * Delete an {@link Album} with {@link Album.id id} from database.
   *
   * @param {string} id Album {@link Album.id id}
   * @returns {Promise<{id: string}>} Deleted Album {@link Album.id id}
   * @async
   */
  deleteAlbumById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${Album.tableName} WHERE id = $1 RETURNING id`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Album ${id} delete failed.`)
    }

    await this.#cacheService.delete(this.albumsCacheKey)
    await this.#cacheService.delete(this.albumCacheKey(id))
    await this.#cacheService.delete(this.albumSongsCacheKey(id))

    return result.rows[0]
  }

  /**
   * Edit an {@link Album} cover art URL with {@link Album.id id} from database.
   *
   * @param {string} id Album {@link Album.id id}
   * @param {string} coverArtUrl Cover Art URL
   * @returns {Promise<{id: string}>} Updated Album {@link Album.id id}
   * @async
   */
  editAlbumCoverArtById = async (id, coverArtUrl) => {
    const query = {
      text: `UPDATE ${Album.tableName} SET cover_url = $1 WHERE id = $2 RETURNING id`,
      values: [coverArtUrl, id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Album ${id} update failed. Can't find an album with id ${id}`)
    }

    await this.#cacheService.delete(this.albumsCacheKey)
    await this.#cacheService.delete(this.albumCacheKey(id))

    return result.rows[0]
  }

  /**
   * Gets an {@link Album} information by its {@link Album.id id} from database.
   *
   * @param {string} id Album {@link Album.id id}
   * @returns {Promise<CacheableAlbum>} Album
   * @async
   */
  getAlbumInformationById = async (id) => {
    try {
      const cachedAlbum = await this.#cacheService.get(this.albumCacheKey(id))

      return {
        album: JSON.parse(cachedAlbum),
        __fromCache: true
      }
    } catch (error) {
    /** @type {QueryConfig} */
      const query = {
        text: `SELECT * FROM ${Album.tableName} WHERE id = $1`,
        values: [id]
      }

      const result = await this.db.query(query)

      if (result.rowCount === 0) {
        throw new NotFoundError(`Can't find an album with id ${id}`)
      }

      const album = result.rows.map(Album.mapDBToModel)[0]

      await this.#cacheService.set(this.albumCacheKey(id), JSON.stringify(album), 60 * 30)

      return {
        album,
        __fromCache: false
      }
    }
  }
}

module.exports = AlbumsService
