const { nanoid } = require('nanoid')

/**
 * OpenMusic API - Song data model
 *
 * @module data/song
 */

/**
 * Represents a Song
 *
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
   * Construct a new {@link Song}.
   *
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

  /**
   * Returns a new random `id` for {@link Song}.
   *
   * @returns {string} Random `id` for {@link Song}
   */
  static generateId () {
    return `song-${nanoid(16)}`
  }
}

module.exports = Song
