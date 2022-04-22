const { nanoid } = require('nanoid')
const { SongRequestPayload, SongDbRow, SongListItem } = require('~types/data/song')

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
  static tableName = 'songs'
  id
  title
  year
  genre
  performer
  duration
  albumId

  /**
   * Construct a new {@link Song}.
   *
   * @param {SongRequestPayload} obj Object payload
   */
  constructor ({ id, title, year, genre, performer, duration, albumId }) {
    this.id = id ?? Song.generateId()
    this.title = title
    this.year = year
    this.genre = genre
    this.performer = performer
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

  /**
   * Maps database result(s) to this data model
   *
   * @param {SongDbRow}  dbRow Item from database
   * @returns {Song} This data model
   */

  /* eslint-disable camelcase */

  static mapDBToModel =
    ({ id, title, year, performer, genre, duration, album_id }) =>
      new Song({ id, title, year, performer, genre, duration, albumId: album_id })

  /* eslint-enable camelcase */

  /**
   * @param {SongListItem} obj Album Song List Item
   * @returns {SongListItem} Album Song List Item
   */
  static mapDBToSongListItem = ({ id, title, performer }) => ({ id, title, performer })
}

module.exports = Song
