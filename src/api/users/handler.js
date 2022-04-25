const { UsersPluginOptions } = require('~types/api/users')
/**
 * Songs Plugin - Handler class
 *
 * @typedef {import('./routes')} SongRoutes
 */

class UsersHandler {
  service
  validator
  /**
   * Construct a new {@link UsersHandler Users Handler} with {@link UsersPluginOptions options}
   *
   * @param {UsersPluginOptions} options Users plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  postUserHandler = async () => {}
  getUserByIdHandler = async () => {}
}

module.exports = { UsersHandler }
