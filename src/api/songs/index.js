const { SongsPluginOptions } = require('~types/api/songs')
const { Plugin } = require('~types/api')
const { SongsHandler } = require('./handler')
const routes = require('./routes')

/**
 * OpenMusic API - Songs API
 *
 * @module api/songs
 */

/**
 * Songs plugin registration object
 *
 * @type {Plugin<SongsPluginOptions>}
 * @memberof module:api/songs
 */
const SongsPlugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, options) => {
    const handler = new SongsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = SongsPlugin
