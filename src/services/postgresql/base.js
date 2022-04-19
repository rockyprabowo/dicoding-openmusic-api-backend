const { Connection } = require('~types/services/postgresql')
const { Pool } = require('pg')
const BaseService = require('@services/base')

/**
 * OpenMusic API - PostgreSQL Persistence Service Layer
 *
 * @module services/postgresql
 */

/**
 * @typedef {object} PostgresBaseOptions
 * @property {Connection} connection Connection
 * @memberof module:services/postgresql
 */

/**
 * Represents the base PostgreSQL persistence service
 *
 * @abstract
 * @memberof module:services/postgresql
 */
class PostgresBase extends BaseService {
  #connection

  /**
   * Construct a new {@link PostgresBase}.
   *
   * @param {PostgresBaseOptions} [options] Options
   */
  constructor (options) {
    super()
    this.#connection = options?.connection ?? new Pool()
  }

  get db () { return this.#connection }
}

module.exports = PostgresBase
