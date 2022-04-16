const { SongsHandler } = require('./handler') // eslint-disable-line

/**
 * Songs Plugin - Routes
 *
 * @module api/songs
 * @typedef {import('@hapi/hapi').ServerRoute} ServerRoute
 * @param {SongsHandler} handler Songs handler
 * @returns {ServerRoute[]} Hapi route definitions
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
