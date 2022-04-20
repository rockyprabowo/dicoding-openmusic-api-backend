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
  pgm.createTable('albums', {
    id: { type: 'VARCHAR(32)', primaryKey: true },
    name: { type: 'TEXT', notNull: true },
    year: { type: 'INTEGER', notNull: true }
  })
  pgm.createTable('songs', {
    id: { type: 'VARCHAR(32)', primaryKey: true },
    title: { type: 'TEXT', notNull: true },
    year: { type: 'INTEGER', notNull: true },
    performer: { type: 'TEXT', notNull: true },
    genre: { type: 'TEXT', notNull: true },
    duration: { type: 'INTEGER' },
    albumId: { type: 'VARCHAR(32)' }
  })
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropTable('songs')
  pgm.dropTable('albums')
}
