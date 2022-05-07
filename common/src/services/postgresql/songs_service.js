const PostgresBase = require('./base')
const CacheService = require('../redis/cache_service')
const Song = require('../../data/song/song')
const {
  SongRequestPayload,
  SongsFilterPayload,
  SongListItem,
  CacheableSongCollection,
  CacheableSong
} = require('../../types/data/song')
const { QueryConfig } = require('../../types/services/postgresql')
const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')

/**
 * OpenMusic API - Songs Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/songs
 */

/**
 * Represents a service class related to {@link Song}.
 *
 */
class SongsService extends PostgresBase {
  #cacheService

  /**
   * Construct an {@link SongsService}
   *
   * @param {CacheService} cacheService Cache service
   */
  constructor (cacheService) {
    super()
    this.#cacheService = cacheService
  }

  /**
   * Song cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  songCacheKey = (id) => `song:${id}`

  /**
   * Album songs cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  albumSongsCacheKey = (id) => `albums:${id}:songs`

  songsCacheKey = 'songs'

  /**
   * Adds a {@link Song} into the database.
   *
   * @param {SongRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted Song {@link Song.id id}
   * @async
   */
  addSong = async (payload) => {
    const song = new Song(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${Song.tableName} (id, title, year, genre, performer, duration, album_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      values: [
        song.id, song.title, song.year, song.genre, song.performer, song.duration, song.albumId
      ]
    }

    const result = await this.db.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Adding the new song failed')
    }

    await this.#cacheService.delete(this.songsCacheKey)

    return result.rows[0]
  }

  /**
   * Get {@link Song} from the cache or database.
   *
   * @param {SongsFilterPayload} filters Filters
   * @returns {Promise<CacheableSongCollection>} Songs
   * @async
   */
  getSongs = async (filters) => {
    try {
      if (filters.albumId) {
        const cachedSongsByAlbumId = await this.#cacheService.get(this.albumSongsCacheKey(filters.albumId))
        return {
          songs: JSON.parse(cachedSongsByAlbumId),
          __fromCache: true
        }
      } else {
        if (filters.title || filters.performer) {
          /// https://stackoverflow.com/questions/4006324/how-to-atomically-delete-keys-matching-a-pattern-using-redis
          throw new Error('Filter with title/performer is not cacheable.')
        }

        const cachedSongs = await this.#cacheService.get(this.songsCacheKey)
        return {
          songs: JSON.parse(cachedSongs),
          __fromCache: true
        }
      }
    } catch (error) {
      const songs = await this.getSongsFromDb(filters)
      return {
        songs,
        __fromCache: false
      }
    }
  }

  /**
   * Get {@link Song songs} from the database.
   *
   * @param {SongsFilterPayload} filters Filters
   * @returns {Promise<SongListItem[]>} Songs
   * @async
   */
  getSongsFromDb = async (filters) => {
    /** @type {(string | null)} */
    let cacheKeyTarget = this.songsCacheKey

    /** @type {QueryConfig} */
    const baseQuery = {
      text: `SELECT * FROM ${Song.tableName}`,
      values: []
    }

    const query = baseQuery

    if (filters.albumId) {
      query.text += ' WHERE album_id = $1'
      query.values = [filters.albumId]
      cacheKeyTarget = this.albumSongsCacheKey(filters.albumId)
    } else {
      let filterCount = 0

      if (filters.title) {
        query.text += ` WHERE lower(title) LIKE $${++filterCount}`
        query.values?.push(`%${filters.title.toLowerCase()}%`)
        cacheKeyTarget = null
      }

      if (filters.performer) {
        query.text += ` ${(filterCount !== 0) ? 'AND' : 'WHERE'} lower(performer) LIKE $${++filterCount}`
        query.values?.push(`%${filters.performer.toLowerCase()}%`)
        cacheKeyTarget = null
      }
    }

    const queryResult = await this.db.query(query)
    const songs = queryResult.rows.map(Song.mapDBToSongListItem)

    if (cacheKeyTarget) {
      await this.#cacheService.set(cacheKeyTarget, JSON.stringify(songs), 60 * 30)
    }

    return songs
  }

  /**
   * Get a {@link Song} by its {@link Song.id id} from the cache or database.
   *
   * @param {string} id {@link Song.id id}
   * @returns {Promise<CacheableSong>} Song
   * @async
   */
  getSongById = async (id) => {
    try {
      const cachedSong = await this.#cacheService.get(this.songCacheKey(id))
      return {
        song: JSON.parse(cachedSong),
        __fromCache: true
      }
    } catch (error) {
    /** @type {QueryConfig} */
      const query = {
        text: `SELECT * FROM ${Song.tableName} WHERE id = $1`,
        values: [id]
      }

      const queryResult = await this.db.query(query)

      if (queryResult.rowCount === 0) {
        throw new NotFoundError(`Can't find a song with id ${id}`)
      }

      const song = queryResult.rows.map(Song.mapDBToModel)[0]

      await this.#cacheService.set(this.songCacheKey(id), JSON.stringify(song), 30 * 60)

      return {
        song,
        __fromCache: false
      }
    }
  }

  /**
   * Edit the {@link Song} with {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @param {SongRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Updated Song {@link Song.id id}
   * @async
   */
  editSongById = async (id, payload) => {
    const songData = await this.getSongById(id)
    const query = {
      text: `UPDATE ${Song.tableName}
          SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6
          WHERE id = $7 RETURNING id`,
      values: [payload.title, payload.year, payload.genre, payload.performer, payload.duration, payload.albumId, id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Song ${id} update has failed.`)
    }

    await this.#cacheService.delete(this.songsCacheKey)
    await this.#cacheService.delete(this.songCacheKey(id))
    if (songData.song.albumId) {
      await this.#cacheService.delete(this.albumSongsCacheKey(songData.song.albumId))
    }

    return result.rows[0]
  }

  /**
   * Delete the {@link Song} with {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @returns {Promise<{id: string}>} Deleted Song {@link Song.id id}
   * @async
   */
  deleteSongById = async (id) => {
    const songData = await this.getSongById(id)

    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${Song.tableName} WHERE id = $1 RETURNING id`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Song ${id} delete has failed.`)
    }

    await this.#cacheService.delete(this.songsCacheKey)
    await this.#cacheService.delete(this.songCacheKey(id))
    if (songData.song.albumId) {
      await this.#cacheService.delete(this.albumSongsCacheKey(songData.song.albumId))
    }

    return result.rows[0]
  }
}

module.exports = SongsService
