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
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(32)',
      primaryKey: true
    },
    name: {
      type: 'TEXT',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(32)',
      notNull: true
    }
  })

  pgm.addConstraint('playlists',
    'fk_playlists.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  )
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id')
  pgm.dropTable('playlists')
}
