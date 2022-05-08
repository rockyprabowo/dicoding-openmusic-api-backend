const { ExportsPlaylistsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Exports Plugin - Routes
 *
 *  @typedef {import('.')} ExportsPlaylistsPlugin
 */

/**
 * Routes of {@link ExportsPlaylistsPlugin}, handled by {@link ExportsPlaylistsHandler}
 *
 * @param {ExportsPlaylistsHandler} handler {@link ExportsPlaylistsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/exports/playlists
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/{id}',
    handler: handler.postExportPlaylistHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  }
]

module.exports = routes
