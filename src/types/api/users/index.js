
/**
 * Users Plugin - Types
 *
 * @typedef {import('@api/users')} UsersPlugin
 * @typedef {import('@api/users/handler').UsersHandler} UsersHandler
 * @typedef {import('@services/postgresql/authentication_service')} AuthenticationService
 * @typedef {import('@validators/base')} Validator
 */

/**
 * Represents the options for {@link UsersPlugin}
 *
 * @typedef {object} UsersPluginOptions
 * @property {AuthenticationService} service Service for {@link UsersHandler}
 * @property {Validator} validator Validator for {@link UsersHandler}
 */

module.exports = {}
