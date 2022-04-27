/* eslint-disable camelcase */

const { PgLiteral } = require('node-pg-migrate')

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
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'SERIAL',
      primaryKey: true
    },
    playlist_id: {
      type: 'VARCHAR(32)',
      notNull: true
    },
    song_id: {
      type: 'VARCHAR(32)',
      notNull: true
    },
    user_id: {
      type: 'VARCHAR(32)',
      notNull: true
    },
    action: {
      type: 'VARCHAR(16)',
      notNull: true,
      check: "action in ('add', 'delete')"
    },
    time: {
      type: 'TIMESTAMP WITH TIME ZONE',
      notNull: true,
      default: new PgLiteral('CURRENT_TIMESTAMP')
    }
  })

  pgm.addConstraint(
    'playlist_song_activities',
    'fk_playlist_song_activities.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  )
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropConstraint(
    'playlist_song_activities',
    'fk_playlist_song_activities.playlist_id_playlists.id'
  )
  pgm.dropTable('playlist_song_activities')
}
