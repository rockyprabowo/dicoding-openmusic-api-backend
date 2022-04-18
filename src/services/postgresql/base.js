const { Pool } = require('pg')
const BaseService = require('../base')

/**
 * OpenMusic API - PostgreSQL Persistence Service Layer
 *
 * @module services/postgresql
 */

/**
 * @typedef {import('pg').Client} Client
 * @typedef {(Pool | Client)} Connection
 */

/**
 * Represents the base PostgreSQL persistence service
 *
 * @abstract
 */
class PostgresBase extends BaseService {
  #connection

  /**
   * Construct a new {@link PostgresBase}.
   *
   * @param {object} [options] Options
   * @param {Connection} [options.connection] Connection
   */
  constructor ({ connection }) {
    super()
    this.#connection = connection ?? new Pool()
  }

  get db () { return this.#connection }
}

module.exports = PostgresBase
