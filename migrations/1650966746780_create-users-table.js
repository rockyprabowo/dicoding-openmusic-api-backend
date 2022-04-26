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
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    },
    fullname: {
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
  pgm.dropTable('users')
}
