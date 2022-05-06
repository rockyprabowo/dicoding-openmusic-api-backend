const { PlaylistsActivitiesHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Playlists Activities Plugin - Routes
 *
 *  @typedef {import('.')} PlaylistsActivitiesPlugin
 */

/**
 * Routes of {@link PlaylistsActivitiesPlugin}, handled by {@link PlaylistsActivitiesHandler}
 *
 * @param {PlaylistsActivitiesHandler} handler {@link PlaylistsActivitiesPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/playlists/activities
 */
const routes = (handler) => [
  {
    method: 'GET',
    path: '/{id}/activities',
    handler: handler.getPlaylistActivitiesById,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  }
]

module.exports = routes
