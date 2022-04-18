const { AlbumsHandler } = require('./handler')

/**
 * Album Plugin - Routes
 *
 * @typedef {import('@hapi/hapi').ServerRoute} ServerRoute
 * @external ServerRoute
 * @see https://hapi.dev/api/#-serverrouteroute
 */

/**
 * Routes of {@link AlbumsPlugin} handled by {@link AlbumsHandler}
 *
 * @param {AlbumsHandler} handler Albums handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/albums
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
