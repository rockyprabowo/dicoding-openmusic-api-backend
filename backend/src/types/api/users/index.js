
/**
 * Users Plugin - Types
 *
 * @typedef {import('~api/users')} UsersPlugin
 * @typedef {import('~api/users/handler').UsersHandler} UsersHandler
 * @typedef {import('@openmusic/common/services/postgresql/users_service')} UsersService
 * @typedef {import('~validators/user')} UserValidator
 */

/**
 * Represents the options for {@link UsersPlugin}
 *
 * @typedef {object} UsersPluginOptions
 * @property {UsersService} usersService Service for {@link UsersHandler}
 * @property {UserValidator} validator Validator for {@link UsersHandler}
 * @memberof module:api/users
 */

module.exports = {}
