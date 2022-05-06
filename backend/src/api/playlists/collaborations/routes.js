const { PlaylistsCollaborationsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Playlists Collaborations Plugin - Routes
 *
 *  @typedef {import('.')} PlaylistsCollaborationsPlugin
 */

/**
 * Routes of {@link PlaylistsCollaborationsPlugin}, handled by {@link PlaylistsCollaborationsHandler}
 *
 * @param {PlaylistsCollaborationsHandler} handler {@link PlaylistsCollaborationsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/playlists/collaborations
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postCollaborationHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteCollaborationHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  }
]

module.exports = routes
