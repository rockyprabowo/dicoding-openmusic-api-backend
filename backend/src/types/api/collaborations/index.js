
/**
 * Collaborations Plugin - Types
 *
 * @typedef {import('~api/collaborations')} CollaborationsPlugin
 * @typedef {import('~api/collaborations/handler').CollaborationsHandler} CollaborationsHandler
 * @typedef {import('@openmusic/common/services/postgresql/collaborations_service')} CollaborationsService
 * @typedef {import('@openmusic/common/services/postgresql/playlists_service')} PlaylistsService
 * @typedef {import('~validators/collaboration')} CollaborationValidator
 * @typedef {import('~utils/tokenise/token_manager')} TokenManager
 */

/**
 * Represents the options for {@link CollaborationsPlugin}
 *
 * @typedef {object} CollaborationsPluginOptions
 * @property {CollaborationsService} collaborationsService Collaborations Service for {@link CollaborationsHandler}
 * @property {PlaylistsService} playlistsService Playlists Service for {@link CollaborationsHandler}
 * @property {CollaborationValidator} validator Validators for {@link CollaborationsHandler}
 */

module.exports = {}
