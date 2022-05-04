const { CollaborationsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { CollaborationsPluginOptions } = require('~types/api/collaborations')

/**
 * OpenMusic API - Collaborations API Plugin
 *
 * @module api/collaborations
 */

/**
 * Collaborations plugin registration object
 *
 * @type {Plugin<CollaborationsPluginOptions>}
 * @memberof module:api/collaborations
 */
const CollaborationsPlugin = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new CollaborationsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = CollaborationsPlugin
