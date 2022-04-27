
/**
 * Playlists Plugin - Types
 *
 * @typedef {import('@api/playlists')} PlaylistsPlugin
 * @typedef {import('@api/playlists/handler').PlaylistsHandler} PlaylistsHandler
 * @typedef {import('@services/postgresql/playlists_service')} PlaylistsService
 * @typedef {import('@validators/playlist')} PlaylistValidator
 */

/**
 * Represents the options for {@link PlaylistsPlugin}
 *
 * @typedef {object} PlaylistsPluginOptions
 * @property {PlaylistsService} service Service for {@link PlaylistsHandler}
 * @property {PlaylistValidator} validator Validator for {@link PlaylistsHandler}
 */

module.exports = {}
