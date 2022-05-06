const { PlaylistsSongsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Playlists Plugin - Routes
 *
 *  @typedef {import('.')} PlaylistsSongsPlugin
 */

/**
 * Routes of {@link PlaylistsSongsPlugin}, handled by {@link PlaylistsHandler}
 *
 * @param {PlaylistsSongsHandler} handler {@link PlaylistsSongsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/playlists
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/{id}/songs',
    handler: handler.postPlaylistSongByIdHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  },
  {
    method: 'GET',
    path: '/{id}/songs',
    handler: handler.getPlaylistSongsByIdHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  },
  {
    method: 'DELETE',
    path: '/{id}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  }
]

module.exports = routes
