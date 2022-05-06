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
  // Add a default album
  pgm.sql("INSERT INTO albums(id, name, year) VALUES ('album-default', '<No Album>', 0)")

  // Set every null album_id to the default album
  pgm.sql("UPDATE songs SET album_id = 'album-default' WHERE album_id = NULL")

  // Set default value to 'album-default'
  pgm.alterColumn('songs', 'album_id', {
    default: 'album-default'
  })

  // Add foreign key constraint on `album_id` column in `songs` that refers to `id` column in `albums`
  pgm.addConstraint('songs',
    'fk_songs.album_id_albums.id',
    'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE SET DEFAULT'
  )
}

/**
 * Migration: down
 *
 * @param {MigrationBuilder} pgm Migration Builder
 */
exports.down = pgm => {
  pgm.dropConstraint('songs', 'fk_songs.album_id_albums.id')

  // Drop songs.album_id default
  pgm.alterColumn('songs', 'album_id', {
    default: null
  })

  pgm.sql("UPDATE songs SET album_id = NULL WHERE album_id = 'album-default'")

  pgm.sql("DELETE FROM albums WHERE id = 'album-default'")
}
