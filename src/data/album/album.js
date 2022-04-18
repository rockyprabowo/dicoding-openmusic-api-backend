const { nanoid } = require('nanoid')

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
   * @param {object} obj Object payload
   * @param {string} [obj.id] id
   * @param {string} obj.name name
   * @param {number} obj.year year
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
