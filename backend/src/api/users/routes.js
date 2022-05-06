const { UsersHandler } = require('./handler')
const { ServerRoute } = require('~types/api')

/**
 * Albums Plugin - Routes
 *
 *  @typedef {import('.')} UsersPlugin
 */

/**
 * Routes of {@link UsersPlugin}, handled by {@link UsersHandler}
 *
 * @param {UsersHandler} handler {@link UsersPlugin} handler
 * @returns {ServerRoute[]} Hapi route definitions
 * @memberof module:api/Users
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postUserHandler
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getUserByIdHandler
  }
]

module.exports = routes
