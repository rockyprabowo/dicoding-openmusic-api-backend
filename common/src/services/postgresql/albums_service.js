const PostgresBase = require('./base')
const SongsService = require('./songs_service')
const Album = require('../../data/album/album')
const { AlbumRequestPayload } = require('../../types/data/album')
const { QueryConfig } = require('../../types/services/postgresql')
const InvariantError = require('../../exceptions/invariant_error')
const NotFoundError = require('../../exceptions/not_found_error')

/**
 * OpenMusic API - Albums Service (PostgreSQL Persistence)
 *
 * @module services/postgresql/albums
 */

/**
 * Represents a service class related to {@link Album}.
 *
 * @augments PostgresBase
 */
class AlbumsService extends PostgresBase {
  #songsService

  /**
   * Construct an {@link AlbumsService}
   *
   * @param {SongsService} songsService Songs Service
   */
  constructor (songsService) {
    super()
    this.#songsService = songsService
  }

  /**
   * Adds an {@link Album} into database.
   *
   * @param {AlbumRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted Album {@link Album.id id}
   * @async
   */
  addAlbum = async (payload) => {
    const album = new Album(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${Album.tableName} (id, name, year) VALUES ($1, $2, $3) RETURNING id`,
      values: [album.id, album.name, album.year]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new InvariantError('Add new album failed')
    }

    return result.rows[0]
  }

  /**
   * Get an {@link Album} by its {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @returns {Promise<Album>} Album
   * @async
   */
  getAlbumById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `SELECT * FROM ${Album.tableName} WHERE id = $1`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Can't find an album with id ${id}`)
    }

    const album = result.rows.map(Album.mapDBToModel)[0]

    album.songs = await this.#songsService.getSongs({ albumId: album.id })

    return album
  }

  /**
   * Get all {@link Album} from database.
   *
   * @returns {Promise<Album[]>} Albums
   * @async
   */
  getAlbums = async () => {
    const result = await this.db.query(
      `SELECT * FROM ${Album.tableName}`
    )

    return result.rows.map(Album.mapDBToModel)
  }

  /**
   * Edit an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @param {AlbumRequestPayload} payload Request Payload
   * @returns {Promise<{id: string}>} Updated Album {@link Album.id id}
   * @async
   */
  editAlbumById = async (id, payload) => {
    const query = {
      text: `UPDATE ${Album.tableName} SET name = $1, year = $2 WHERE id = $3 RETURNING id`,
      values: [payload.name, payload.year, id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Album ${id} update failed. Can't find an album with id ${id}`)
    }

    return result.rows[0]
  }

  /**
   * Delete an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @returns {Promise<{id: string}>} Deleted Album {@link Album.id id}
   * @async
   */
  deleteAlbumById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${Album.tableName} WHERE id = $1 RETURNING id`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError(`Album ${id} delete failed.`)
    }

    return result.rows[0]
  }
}

module.exports = AlbumsService
