const { AlbumsLikesHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { AlbumsLikesPluginOptions } = require('~types/api/albums/likes')

/**
 * OpenMusic API - Albums Likes API Plugin
 *
 * @module api/albums/likes
 */

/**
 * Albums Likes plugin registration object
 *
 * @type {Plugin<AlbumsLikesPluginOptions>}
 * @memberof module:api/albums/likes
 */
const AlbumsLikesPlugin = {
  name: 'albums_likes',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new AlbumsLikesHandler(options)
    server.route(routes(handler))
  }
}

module.exports = AlbumsLikesPlugin
