const { genericPreResponseHandler } = require('@utils')
const { Plugin } = require('~types/api')
const { AuthenticationsPluginOptions } = require('~types/api/authentications')
const { AuthenticationsHandler } = require('./handler')
const routes = require('./routes')

/**
 * OpenMusic API - Authentications API Plugin
 *
 * @module api/authentications
 */

/**
 * Authentications plugin registration object
 *
 * @type {Plugin<AuthenticationsPluginOptions>}
 * @memberof module:api/authentications
 */
const AuthenticationsPlugin = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new AuthenticationsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = AuthenticationsPlugin
