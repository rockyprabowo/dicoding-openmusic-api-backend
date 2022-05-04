const { ExportsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { ExportsPluginOptions } = require('~types/api/exports')

/**
 * OpenMusic API - Exports API
 *
 * @module api/exports
 */

/**
 * Exports plugin registration object
 *
 * @type {Plugin<ExportsPluginOptions>}
 * @memberof module:api/exports
 */
const ExportsPlugin = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new ExportsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = ExportsPlugin
