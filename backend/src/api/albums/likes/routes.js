const { AlbumsLikesHandler } = require('./handler')
const { ServerRoute } = require('~types/api')
const { useRouteAuthStrategy } = require('~utils')

/**
 * Albums Plugin - Routes
 *
 *  @typedef {import('.')} AlbumsLikesPlugin
 */

/**
 * Routes of {@link AlbumsLikePlugin}, handled by {@link AlbumsHandler}
 *
 * @param {AlbumsLikesHandler} handler {@link AlbumsLikePlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/albums/likes
 */
const routes = (handler) => [
  {
    method: 'GET',
    path: '/{id}/likes',
    handler: handler.getAlbumLikeCountByIdHandler
  },
  {
    method: 'POST',
    path: '/{id}/likes',
    handler: handler.postUserLikeAlbumByIdHandler,
    options: {
      ...useRouteAuthStrategy('openmusic_jwt')
    }
  }
]

module.exports = routes
