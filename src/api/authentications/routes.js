const { AuthenticationsHandler } = require('./handler')
const { ServerRoute } = require('~types/api')

/**
 * Authentication Plugin - Routes
 *
 *  @typedef {import('.')} AuthenticationsPlugin
 */

/**
 * Routes of {@link AuthenticationsPlugin}, handled by {@link AuthenticationsHandler}
 *
 * @param {AuthenticationsHandler} handler {@link AuthenticationsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/authentications
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postAuthenticationHandler
  },
  {
    method: 'PUT',
    path: '/',
    handler: handler.putAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteAuthenticationHandler
  }
]

module.exports = routes
