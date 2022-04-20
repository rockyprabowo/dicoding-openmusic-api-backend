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
  pgm.addIndex('songs', 'lower(title)', {
    name: 'songs_lower_title_idx'
  })
  pgm.addIndex('songs', 'lower(performer)', {
    name: 'songs_lower_performer_idx'
  })
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropIndex('songs', 'lower(title)', {
    name: 'songs_lower_title_idx'
  })
  pgm.dropIndex('songs', 'lower(performer)', {
    name: 'songs_lower_performer_idx'
  })
}
