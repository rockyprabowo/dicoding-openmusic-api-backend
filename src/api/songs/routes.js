const { ServerRoute } = require('../_types')
const { SongsHandler } = require('./handler')

/**
 * Routes of {@link SongsPlugin} handled by {@link SongsHandler}
 *
 * @param {SongsHandler} handler {@link SongPlugin} route handler
 * @returns {ServerRoute[]} {@link SongPlugin} Hapi route definitions
 * @memberof module:api/songs
 */
const routes = (handler) => [
  // TODO: Fill song API routes
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler
  }
]

module.exports = routes
