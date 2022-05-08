const { nanoid } = require('nanoid')
const Song = require('../../data/song/song')
const { AlbumRequestPayload, AlbumDbRow } = require('../../types/data/album')
const { SongListItem } = require('../../types/data/song')

/**
 * OpenMusic API - Album data model
 *
 * @module data/album
 */

/**
 * Represents an Album
 *
 * @memberof module:data/album
 */
class Album {
  static tableName = 'albums'
  id
  name
  year
  coverUrl
  /** @type {(Song[] | SongListItem[])}  */
  #songs = []

  static albumsCacheKey = 'albums'

  /**
   * Album cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  static albumCacheKey = (id) => (`albums:${id}`)

  /**
   * Album songs cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  static albumSongsCacheKey = (id) => (`albums:${id}:songs`)

  /**
   * Construct a new {@link Album}
   *
   * @param {AlbumRequestPayload} obj Object payload
   */
  constructor ({ id, name, year, coverUrl }) {
    this.id = id ?? Album.generateId()
    this.name = name
    this.year = year
    this.coverUrl = coverUrl ?? null
  }

  get songs () { return this.#songs }
  set songs (songs) { this.#songs = songs }

  /**
   * Generates a new random `id` for {@link Album}
   *
   * @returns {string} Random `id` for {@link Album}
   */
  static generateId () {
    return `album-${nanoid(16)}`
  }

  /* eslint-disable camelcase */

  /**
   * Maps database result(s) to this data model
   *
   * @param {AlbumDbRow} dbRow Item from database
   * @returns {Album} This data model
   */
  static mapDBToModel = ({ id, name, year, cover_url }) => new Album({ id, name, year, coverUrl: cover_url })

  /* eslint-enable camelcase */

  toJSON () {
    return {
      ...this,
      songs: this.songs
    }
  }
}

module.exports = Album
