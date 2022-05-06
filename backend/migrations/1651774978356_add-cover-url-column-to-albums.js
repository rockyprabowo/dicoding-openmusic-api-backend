/* eslint-disable camelcase */

/**
 * @typedef {import('node-pg-migrate').MigrationBuilder} MigrationBuilder
 */

exports.shorthands = undefined

/**
 * Migration: up
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.up = pgm => {
  pgm.addColumn('albums', {
    cover_url: {
      type: 'TEXT'
    }
  })
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropColumn('albums', 'cover_url')
}
