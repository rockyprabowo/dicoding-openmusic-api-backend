const { nanoid } = require('nanoid')
const { AlbumRequestPayload } = require('~types/data/album')
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
  id
  name
  year

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

  /**
   * Generates a new random `id` for {@link Album}
   *
   * @returns {string} Random `id` for {@link Album}
   */
  static generateId () {
    return `album-${nanoid(16)}`
  }
}

module.exports = Album
