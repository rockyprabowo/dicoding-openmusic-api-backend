const { SongsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('@utils')
const { Plugin } = require('~types/api')
const { SongsPluginOptions } = require('~types/api/songs')

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
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new SongsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = SongsPlugin
