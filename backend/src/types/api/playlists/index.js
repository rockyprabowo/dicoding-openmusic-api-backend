
/**
 * Playlists Plugin - Types
 *
 * @typedef {import('~api/playlists')} PlaylistsPlugin
 * @typedef {import('~api/playlists/handler').PlaylistsHandler} PlaylistsHandler
 * @typedef {import('@openmusic/common/services/postgresql/playlists_service')} PlaylistsService
 * @typedef {import('~validators/playlist')} PlaylistValidators
 */

/**
 * Represents the options for {@link PlaylistsPlugin}
 *
 * @typedef {object} PlaylistsPluginOptions
 * @property {PlaylistsService} playlistsService Playlists Service
 * @property {PlaylistValidators} validators Validators
 * @memberof module:api/playlists
 */

module.exports = {}
