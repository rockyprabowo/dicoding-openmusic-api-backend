
/**
 * Authentications Plugin - Types
 *
 * @typedef {import('~api/authentications')} AuthenticationsPlugin
 * @typedef {import('~api/authentications/handler').AuthenticationsHandler} AuthenticationsHandler
 * @typedef {import('@openmusic/common/services/postgresql/authentications_service')} AuthenticationsService
 * @typedef {import('@openmusic/common/services/postgresql/users_service')} UsersService
 * @typedef {import('~validators/authentication')} AuthenticationValidators
 * @typedef {import('~utils/tokenise/token_manager')} TokenManager
 */

/**
 * Represents the options for {@link AuthenticationsPlugin}
 *
 * @typedef {object} AuthenticationsPluginOptions
 * @property {AuthenticationsService} authenticationsService Authentications Service for {@link AuthenticationsHandler}
 * @property {UsersService} usersService Users Service for {@link AuthenticationsHandler}
 * @property {TokenManager} tokenManager Token manager for {@link AuthenticationsHandler}
 * @property {AuthenticationValidators} validators Validators for {@link AuthenticationsHandler}
 * @memberof module:api/authentications
 */

module.exports = {}
