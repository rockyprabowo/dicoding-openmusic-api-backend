const PostgresBase = require('./base')
const AlbumLike = require('../../data/album/album_like')
const { CacheableAlbumLikesCount } = require('../../types/data/album_like')
const { QueryConfig } = require('../../types/services/postgresql')
const AlbumsService = require('./albums_service')
const CacheService = require('../redis/cache_service')

/**
 * OpenMusic API - Albums Likes Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/albums_likes
 */

/**
 * @typedef {import('../../data/user/user')} User
 */

/**
 * Represents a service class related to {@link Album} likes.
 *
 * @memberof module:services/postgresql/albums_likes
 */
class AlbumsLikesService extends PostgresBase {
  #albumsService
  #cacheService

  /**
   * Construct an {@link AlbumsLikesService}
   *
   * @param {CacheService} cacheService Cache service
   * @param {AlbumsService} albumsService Songs Service
   */
  constructor (cacheService, albumsService) {
    super()
    this.#cacheService = cacheService
    this.#albumsService = albumsService
  }

  /**
   * Get an {@link Album} like count by its {@link Album.id id} from database.
   *
   * @param {string} albumId Album {@link Album.id id}
   * @returns {Promise<CacheableAlbumLikesCount>} Album
   * @async
   */
  getAlbumLikeCountById = async (albumId) => {
    try {
      const result = await this.#cacheService.get(AlbumLike.likeCountCacheKey(albumId))

      return {
        ...JSON.parse(result),
        __fromCache: true
      }
    } catch (error) {
      const albumData = await this.#albumsService.getAlbumDataById(albumId)

      /** @type {QueryConfig} */
      const query = {
        text: `SELECT count(*) as likes FROM ${AlbumLike.tableName} WHERE album_id = $1`,
        values: [albumData.album.id]
      }

      const queryResult = await this.db.query(query)

      const { likes } = queryResult.rows.map(AlbumLike.mapLikesCount)[0]

      await this.#cacheService.set(AlbumLike.likeCountCacheKey(albumId), JSON.stringify({ likes }), 1800)

      return {
        likes,
        __fromCache: false
      }
    }
  }

  /**
   * Gets a {@link User} like state on an {@link Album} with an {@link Album.id id} from database.
   *
   * @param {string} albumId Album {@link Album.id id}
   * @param {string} userId User {@link User.id id}
   * @returns {Promise<{liked: boolean}>} Album
   * @async
   */
  getUserLikeAlbumById = async (albumId, userId) => {
    /** @type {QueryConfig} */
    const query = {
      text: `SELECT count(*) as likes FROM ${AlbumLike.tableName} WHERE user_id = $1 AND album_id = $2`,
      values: [userId, albumId]
    }

    const queryResult = await this.db.query(query)
    const result = queryResult.rows.map(AlbumLike.mapLikesCount)[0]

    return { liked: result.likes === 1 }
  }

  /**
   * Toggles a {@link User} like state on an {@link Album} with an {@link Album.id id} from database.
   *
   * @param {string} albumId Album {@link Album.id id}
   * @param {string} userId User {@link User.id id}
   * @returns {Promise<{liked: boolean}>} Album
   * @async
   */
  toggleUserLikeAlbumById = async (albumId, userId) => {
    let queryText = ''
    const albumData = await this.#albumsService.getAlbumDataById(albumId)
    const { liked } = await this.getUserLikeAlbumById(albumId, userId)

    if (liked) {
      queryText = `DELETE FROM ${AlbumLike.tableName} WHERE user_id = $1 AND album_id = $2`
    } else {
      queryText = `INSERT INTO ${AlbumLike.tableName} (user_id, album_id) VALUES ($1, $2)`
    }

    /** @type {QueryConfig} */
    const query = {
      text: queryText,
      values: [userId, albumData.album.id]
    }

    await this.db.query(query)
    await this.#cacheService.delete(AlbumLike.likeCountCacheKey(albumId))
    return { liked: !liked }
  }
}

module.exports = AlbumsLikesService
