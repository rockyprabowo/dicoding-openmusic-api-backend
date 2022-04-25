
/**
 * Authentications Plugin - Types
 *
 * @typedef {import('@api/authentications')} AuthenticationsPlugin
 * @typedef {import('@api/authentications/handler').AuthenticationsHandler} AuthenticationsHandler
 * @typedef {import('@services/postgresql/authentication_service')} AuthenticationService
 * @typedef {import('@services/postgresql/users_service')} UsersService
 * @typedef {import('@validators/base')} Validator
 */

/**
 * Represents the options for {@link AuthenticationsPlugin}
 *
 * @typedef {object} AuthenticationsPluginOptions
 * @property {AuthenticationService} service Authentication Service for {@link AuthenticationsHandler}
 * @property {UsersService} userService Users Service for {@link AuthenticationsHandler}
 * @property {Validator} validator Validator for {@link AuthenticationsHandler}
 */

module.exports = {}
