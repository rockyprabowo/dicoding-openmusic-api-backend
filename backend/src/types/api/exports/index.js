
/**
 * Exports Plugin - Types
 *
 * @typedef {import('~api/exports/playlists')} ExportsPlaylistsPlugin
 * @typedef {import('~api/exports/playlists/handler').ExportsPlaylistsHandler} ExportsPlaylistsHandler
 * @typedef {import('~services/rabbitmq/producer_service')} ProducerService
 * @typedef {import('~validators/export_playlist')} ExportPlaylistValidator
 * @typedef {import('@openmusic/common/services/postgresql/playlists_collaborations_service')} CollaborationsService
 * @typedef {import('@openmusic/common/services/postgresql/playlists_service')} PlaylistsService
 */

/**
 * Represents the options for {@link ExportsPlugin}
 *
 * @typedef {object} ExportsPlaylistsPluginOptions
 * @property {ProducerService} producerService Producer Service for {@link ExportsPlaylistsHandler}
 * @property {PlaylistsService} playlistsService Playlists Service for {@link ExportsPlaylistsHandler}
 * @property {ExportPlaylistValidator} validator Validator for {@link ExportsPlaylistsHandler}
 * @memberof module:api/exports/playlists
 */

module.exports = {}
