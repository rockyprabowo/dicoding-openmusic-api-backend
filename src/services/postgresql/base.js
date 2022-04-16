const { Pool } = require('pg')
const BaseService = require('../base')

/**
 * Base PostgreSQL DB persistence Service
 *
 * @module services/postgresql
 * @typedef {import('pg').Client} Client
 * @typedef {(Pool | Client)} Connection
 */

class PostgresBase extends BaseService {
  #connection

  /**
   * @function Object() { [native code] }
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
