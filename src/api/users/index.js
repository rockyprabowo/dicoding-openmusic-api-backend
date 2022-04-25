const { UsersPluginOptions } = require('~types/api/users')
const { Plugin } = require('~types/api')
const { UsersHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('@utils')

/**
 * OpenMusic API - Users API Plugin
 *
 * @module api/Users
 */

/**
 * Users plugin registration object
 *
 * @type {Plugin<UsersPluginOptions>}
 * @memberof module:api/Users
 */
const UsersPlugin = {
  name: 'Users',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new UsersHandler(options)
    server.route(routes(handler))
  }
}

module.exports = UsersPlugin
