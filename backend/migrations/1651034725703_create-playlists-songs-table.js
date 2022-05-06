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
  pgm.createTable('playlists_songs', {
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
    }
  })

  pgm.addConstraint('playlists_songs',
    'fk_playlists_songs.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  )

  pgm.addConstraint('playlists_songs',
    'fk_playlists_songs.song_id_songs.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE'
  )
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropConstraint('playlists_songs', 'fk_playlists_songs.song_id_songs.id')
  pgm.dropConstraint('playlists_songs', 'fk_playlists_songs.playlist_id_playlists.id')
  pgm.dropTable('playlists_songs')
}
