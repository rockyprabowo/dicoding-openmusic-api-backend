const { SongsHandler } = require('./handler')
const { ServerRoute } = require('~types/api')

/**
 * Songs Plugin - Routes
 *
 * @typedef {import('.')} SongsPlugin
 */

/**
 * Routes of {@link SongsPlugin}, handled by {@link SongsHandler}
 *
 * @param {SongsHandler} handler {@link SongPlugin} route handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/songs
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postSongHandler
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getSongsHandler
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getSongByIdHandler
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.putSongByIdHandler
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteSongByIdHandler
  }
]

module.exports = routes
