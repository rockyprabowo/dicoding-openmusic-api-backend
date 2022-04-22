const { nanoid } = require('nanoid')
const Song = require('@data/song/song')
const { AlbumRequestPayload } = require('~types/data/album')
const { SongListItem } = require('~types/data/song')
/**
 * OpenMusic API - Album data model
 *
 * @module data/album
 */

/**
 * Represents an Album
 *
 */
class Album {
  static tableName = 'albums'
  id
  name
  year
  /** @type {(Song[] | SongListItem[])}  */
  #songs = []

  /**
   * Construct a new {@link Album}
   *
   * @param {AlbumRequestPayload} obj Object payload
   */
  constructor ({ id, name, year }) {
    this.id = id ?? Album.generateId()
    this.name = name
    this.year = year
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

  /**
   * Maps database result(s) to this data model
   *
   * @param {AlbumRequestPayload} dbRow Item from database
   * @returns {Album} This data model
   */
  static mapDBToModel = ({ id, name, year }) => new Album({ id, name, year })

  toJSON () {
    return {
      ...this,
      songs: this.songs
    }
  }
}

module.exports = Album
