const { AlbumCoverArtHandler } = require('./handler')
const { ServerRoute } = require('~types/api')

/**
 * Album Cover Art Plugin - Routes
 *
 *  @typedef {import('.')} AlbumCoverArtPlugin
 */

/**
 * Routes of {@link AlbumCoverArtPlugin}, handled by {@link AlbumCoverArtHandler}
 *
 * @param {AlbumCoverArtHandler} handler {@link AlbumCoverArtPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/albums/cover_art
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postAlbumCoverArtById,
    options: {
      payload: {
        maxBytes: 512000,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' }
      }
    }
  },
  ...(process.env.STORAGE_MODE === 'local')
    ? [
        {
          method: 'GET',
          path: '/uploads/images/{param*}',
          handler: {
            directory: {
              path: /** @type {string} */ (handler.directory)
            }
          }
        }
      ]
    : []
]

module.exports = routes
