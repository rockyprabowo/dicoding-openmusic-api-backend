const { nanoid } = require('nanoid')

/**
 * Represents a Song
 *
 * @module data/song
 * @typedef {import('../album/album')} Album
 */
class Song {
  id
  title
  year
  performer
  genre
  duration
  albumId

  /**
   * @function Object() { [native code] }
   * @param {object} obj Object payload
   * @param {string} [obj.id] id
   * @param {string} obj.title title
   * @param {number} obj.year year
   * @param {string} obj.performer performer
   * @param {string} obj.genre genre
   * @param {string} [obj.duration] duration
   * @param {string} [obj.albumId] albumId
   */
  constructor ({ id, title, year, performer, genre, duration, albumId }) {
    this.id = id ?? Song.generateId()
    this.title = title
    this.year = year
    this.performer = performer
    this.genre = genre
    this.duration = duration
    this.albumId = albumId
  }

  static generateId () {
    return `song-${nanoid(16)}`
  }
}

module.exports = Song
