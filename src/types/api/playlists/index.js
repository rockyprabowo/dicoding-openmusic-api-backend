
/**
 * Playlists Plugin - Types
 *
 * @typedef {import('@api/playlists')} PlaylistsPlugin
 * @typedef {import('@api/playlists/handler').PlaylistsHandler} PlaylistsHandler
 * @typedef {import('@services/postgresql/playlists_service')} PlaylistsService
 * @typedef {import('@services/postgresql/collaborations_service')} CollaborationsService
 * @typedef {import('@validators/playlist')} PlaylistValidators
 */

/**
 * Represents the options for {@link PlaylistsPlugin}
 *
 * @typedef {object} PlaylistsPluginOptions
 * @property {PlaylistsService} playlistsService Playlists Service for {@link PlaylistsHandler}
 * @property {PlaylistValidators} validators Validators for {@link PlaylistsHandler}
 */

module.exports = {}
