const { nanoid } = require('nanoid')
const {
  SongRequestPayload,
  SongDbRow,
  SongListItem
} = require('../../types/data/song')

/**
 * OpenMusic API - Song data model
 *
 * @module data/song
 */

/**
 * Represents a Song
 *
 * @memberof module:data/song
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

  /* eslint-disable camelcase */

  /**
   * Maps database result(s) to this data model
   *
   * @param {SongDbRow}  dbRow Item from database
   * @returns {Song} This data model
   */
  static mapDBToModel =
    ({ id, title, year, performer, genre, duration, album_id }) =>
      new Song({ id, title, year, performer, genre, duration, albumId: album_id })

  /* eslint-enable camelcase */

  /**
   * Maps database result(s) to Album Song List
   *
   * @param {SongDbRow} dbRow Item from database
   * @returns {SongListItem} An album song list item
   */
  static mapDBToSongListItem = ({ id, title, performer }) => ({ id, title, performer })
}

module.exports = Song
