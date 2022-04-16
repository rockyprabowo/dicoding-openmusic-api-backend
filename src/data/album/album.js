const { nanoid } = require('nanoid')

/**
 * Represents an Album
 *
 * @module data/album
 * @typedef {import('../song/song')} Song
 */
class Album {
  id
  name
  year

  /**
   * @function Object() { [native code] }
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

  static generateId () {
    return `album-${nanoid(16)}`
  }
}
module.exports = Album
