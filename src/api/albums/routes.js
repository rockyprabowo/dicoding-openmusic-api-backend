const { AlbumsHandler } = require('./handler')
const { ServerRoute } = require('~types/api')

/**
 * Albums Plugin - Routes
 *
 *  @typedef {import('.')} AlbumsPlugin
 */

/**
 * Routes of {@link AlbumsPlugin}, handled by {@link AlbumsHandler}
 *
 * @param {AlbumsHandler} handler {@link AlbumsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/albums
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postAlbumHandler
  },
  {
    method: 'GET',
    path: '/',
    handler: handler.getAlbumsHandler
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getAlbumByIdHandler
  },
  {
    method: 'PUT',
    path: '/{id}',
    handler: handler.putAlbumByIdHandler
  },
  {
    method: 'DELETE',
    path: '/{id}',
    handler: handler.deleteAlbumByIdHandler
  }
]

module.exports = routes
