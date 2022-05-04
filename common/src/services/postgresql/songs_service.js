const PostgresBase = require('./base')
const Song = require('../../data/song/song')
const { SongRequestPayload, SongsFilterPayload, SongListItem } = require('../../types/data/song')
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
 * @augments PostgresBase
 */
class SongsService extends PostgresBase {
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

    return result.rows[0]
  }

  /**
   * Get all {@link Song} from the database.
   *
   * @param {SongsFilterPayload} filters Filters
   * @returns {Promise<SongListItem[]>} Songs
   * @async
   */
  getSongs = async (filters) => {
    /** @type {QueryConfig} */
    const baseQuery = {
      text: `SELECT * FROM ${Song.tableName}`,
      values: []
    }

    const query = baseQuery

    if (filters.albumId) {
      query.text += ' WHERE album_id = $1'
      query.values = [filters.albumId]
    } else if (filters.ids) {
      // TODO: Filter songs by ids
    } else {
      let filterCount = 0

      if (filters.title) {
        query.text += ` WHERE lower(title) LIKE $${++filterCount}`
        query.values?.push(`%${filters.title.toLowerCase()}%`)
      }

      if (filters.performer) {
        query.text += ` ${(filterCount !== 0) ? 'AND' : 'WHERE'} lower(performer) LIKE $${++filterCount}`
        query.values?.push(`%${filters.performer.toLowerCase()}%`)
      }
    }

    const result = await this.db.query(query)

    return result.rows.map(Song.mapDBToSongListItem)
  }

  /**
   * Get a {@link Song} by its {@link Song.id id} from the database.
   *
   * @param {string} id {@link Song.id id}
   * @returns {Promise<Song>} Song
   * @async
   */
  getSongById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `SELECT * FROM ${Song.tableName} WHERE id = $1`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Can't find a song with id ${id}`)
    }

    return result.rows.map(Song.mapDBToModel)[0]
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
    const query = {
      text: `UPDATE ${Song.tableName}
          SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6
          WHERE id = $7 RETURNING id`,
      values: [payload.title, payload.year, payload.genre, payload.performer, payload.duration, payload.albumId, id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Song ${id} update has failed. Can't find an song with id ${id}`)
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
    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${Song.tableName} WHERE id = $1 RETURNING id`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Song ${id} delete has failed.`)
    }

    return result.rows[0]
  }
}

module.exports = SongsService
