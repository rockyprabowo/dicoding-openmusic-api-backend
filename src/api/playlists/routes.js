const { PlaylistsHandler } = require('./handler')
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
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'POST',
    path: '/{id}/songs',
    handler: handler.postPlaylistSongByIdHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'GET',
    path: '/{id}/songs',
    handler: handler.getPlaylistSongsByIdHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/{id}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'GET',
    path: '/{id}/activities',
    handler: handler.getPlaylistActivitiesById,
    options: {
      auth: 'openmusic_jwt'
    }
  }
]

module.exports = routes
