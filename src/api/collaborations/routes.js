const { CollaborationsHandler } = require('./handler')
const { useRouteAuthStrategy } = require('@utils')
const { ServerRoute } = require('~types/api')

/**
 * Collaborations Plugin - Routes
 *
 *  @typedef {import('.')} CollaborationsPlugin
 */

/**
 * Routes of {@link CollaborationsPlugin}, handled by {@link CollaborationsHandler}
 *
 * @param {CollaborationsHandler} handler {@link CollaborationsPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/collaborations
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postCollaborationHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteCollaborationHandler,
    ...useRouteAuthStrategy('openmusic_jwt')
  }
]

module.exports = routes
