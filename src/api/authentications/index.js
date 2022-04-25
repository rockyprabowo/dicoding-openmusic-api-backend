const { AuthenticationsPluginOptions } = require('~types/api/authentications')
const { Plugin } = require('~types/api')
const { AuthenticationsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('@utils')

/**
 * OpenMusic API - Authentications API Plugin
 *
 * @module api/Authentications
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
