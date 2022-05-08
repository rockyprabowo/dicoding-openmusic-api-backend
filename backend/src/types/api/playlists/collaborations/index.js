
/**
 * PlaylistsCollaborations Plugin - Types
 *
 * @typedef {import('~api/playlists/collaborations')} PlaylistsCollaborationsPlugin
 * @typedef {import('~api/playlists/collaborations/handler').PlaylistsCollaborationsHandler} PlaylistsCollaborationsHandler
 * @typedef {import('@openmusic/common/services/postgresql/playlists_collaborations_service')} PlaylistsCollaborationsService
 * @typedef {import('@openmusic/common/services/postgresql/playlists_service')} PlaylistsService
 * @typedef {import('~validators/playlist_collaboration')} PlaylistCollaborationValidator
 * @typedef {import('~utils/tokenise/token_manager')} TokenManager
 */

/**
 * Represents the options for {@link PlaylistsCollaborationsPlugin}
 *
 * @typedef {object} PlaylistsCollaborationsPluginOptions
 * @property {PlaylistsCollaborationsService} playlistsCollaborationsService PlaylistsCollaborations Service for {@link PlaylistsCollaborationsHandler}
 * @property {PlaylistsService} playlistsService Playlists Service for {@link PlaylistsCollaborationsHandler}
 * @property {PlaylistCollaborationValidator} validator Validators for {@link PlaylistsCollaborationsHandler}
 * @memberof module:api/playlists/collaborations
 */

module.exports = {}
