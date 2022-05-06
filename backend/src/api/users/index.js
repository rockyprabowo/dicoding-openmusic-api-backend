const { UsersHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { UsersPluginOptions } = require('~types/api/users')

/**
 * OpenMusic API - Users API Plugin
 *
 * @module api/users
 */

/**
 * Users plugin registration object
 *
 * @type {Plugin<UsersPluginOptions>}
 * @memberof module:api/users
 */
const UsersPlugin = {
  name: 'users',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new UsersHandler(options)
    server.route(routes(handler))
  }
}

module.exports = UsersPlugin
