const { ExportsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Exports Plugin - Routes
 *
 *  @typedef {import('.')} ExportsPlugin
 */

/**
 * Routes of {@link ExportsPlugin}, handled by {@link ExportsHandler}
 *
 * @param {ExportsHandler} handler {@link ExportsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/playlists
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postExportPlaylistHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  }
]

module.exports = routes
