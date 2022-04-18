const { AlbumsPluginOptions } = require('./_types')
const { Plugin } = require('../_types')
const { AlbumsHandler } = require('./handler')
const routes = require('./routes')

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
    const handler = new AlbumsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = AlbumsPlugin
