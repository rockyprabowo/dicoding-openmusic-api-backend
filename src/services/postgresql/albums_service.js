const PostgresBase = require('./base')
const Album = require('@data/album/album')
const { AlbumRequestPayload } = require('~types/data/album')
const { QueryConfig } = require('~types/services/postgresql')
const InvariantError = require('@exceptions/invariant_error')
const NotFoundError = require('@exceptions/not_found_error')

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
  tableName = Album.tableName
  /**
   * Adds an {@link Album} into database.
   *
   * @param {AlbumRequestPayload} payload Payload
   * @returns {Promise<{id: string}>} Newly persisted Album ID
   * @async
   */
  addAlbum = async (payload) => {
    const album = new Album(payload)

    /** @type {QueryConfig} */
    const query = {
      text: `INSERT INTO ${this.tableName} (id, name, year) VALUES ($1, $2, $3) RETURNING *`,
      values: [album.id, album.name, album.year]
    }

    const result = await this.db.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return result.rows[0]
  }

  /**
   * Get an {@link Album} by its {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @async
   */
  getAlbumById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE id = $1`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan')
    }

    return result.rows.map(Album.mapDBToModel)[0]
  }

  /**
   * Get all {@link Album} from database.
   *
   * @async
   */
  getAlbums = async () => {
    const result = await this.db.query(
      `SELECT * FROM ${this.tableName}`
    )

    return result.rows.map(Album.mapDBToModel)
  }

  /**
   * Edit an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @param {AlbumRequestPayload} payload Request Payload
   * @async
   */
  editAlbumById = async (id, payload) => {
    const query = {
      text: `UPDATE ${this.tableName} SET name = $1, year = $2 WHERE id = $3 RETURNING id`,
      values: [payload.name, payload.year, id]
    }

    const result = await this.db.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan')
    }

    return result.rows[0]
  }

  /**
   * Delete an {@link Album} with {@link Album.id id} from database.
   *
   * @param {number} id Album {@link Album.id id}
   * @async
   */
  deleteAlbumById = async (id) => {
    /** @type {QueryConfig} */
    const query = {
      text: `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`,
      values: [id]
    }

    const result = await this.db.query(query)

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan')
    }

    return result.rows[0]
  }
}

module.exports = AlbumsService
