/* eslint-disable camelcase */

/**
 * @typedef {import('node-pg-migrate').MigrationBuilder} MigrationBuilder
 */

exports.shorthands = undefined

exports.shorthands = undefined

/**
 * Migration: up
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      notNull: true
    }
  })
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = (pgm) => {
  pgm.dropTable('authentications')
}
