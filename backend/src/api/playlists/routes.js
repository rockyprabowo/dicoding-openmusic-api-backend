const { PlaylistsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('~utils')
const { ServerRoute } = require('~types/api')

/**
 * Playlists Plugin - Routes
 *
 *  @typedef {import('.')} PlaylistsPlugin
 */

/**
 * Routes of {@link PlaylistsPlugin}, handled by {@link PlaylistsHandler}
 *
 * @param {PlaylistsHandler} handler {@link PlaylistsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/playlists
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postPlaylistHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getPlaylistsHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deletePlaylistByIdHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'POST',
    path: '/{id}/songs',
    handler: handler.postPlaylistSongByIdHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'GET',
    path: '/{id}/songs',
    handler: handler.getPlaylistSongsByIdHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'DELETE',
    path: '/{id}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'GET',
    path: '/{id}/activities',
    handler: handler.getPlaylistActivitiesById,
    ...useRouteAuthStrategy('openmusic_jwt')
  }
]

module.exports = routes
