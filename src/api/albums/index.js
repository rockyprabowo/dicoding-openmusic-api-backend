const { AlbumsPluginOptions } = require('~types/api/albums')
const { Plugin } = require('~types/api')
const { AlbumsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('@utils/index')

/**
 * OpenMusic API - Albums API Plugin
 *
 * @module api/albums
 */

/**
 * Albums plugin registration object
 *
 * @type {Plugin<AlbumsPluginOptions>}
 * @memberof module:api/albums
 */
const AlbumsPlugin = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new AlbumsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = AlbumsPlugin
