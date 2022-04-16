const AlbumsHandler = require('./handler') // eslint-disable-line

/**
 * Albums Plugin - Routes
 *
 * @module api/albums
 * @typedef {import('@hapi/hapi').ServerRoute} ServerRoute Hapi route definitions
 * @param {AlbumsHandler} handler Albums handler
 * @returns {ServerRoute[]} Hapi route definitions
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbumsHandler
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler
  }
]

module.exports = routes
