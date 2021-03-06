/**
 * Songs Plugin
 *
 * @typedef {import('~api/songs')} SongsPlugin
 * @typedef {import('~api/songs/handler').SongsHandler} SongsHandler
 * @typedef {import('@openmusic/common/services/postgresql/songs_service')} SongsService
 * @typedef {import('~validators/base')} Validator
 */

/**
 * Represents the options for {@link SongsPlugin}.
 *
 * @typedef {object} SongsPluginOptions
 * @property {SongsService} songsService {@link SongsService}
 * @property {Validator} validator Validator for {@link SongsService}
 * @memberof module:api/songs
 */

module.exports = {}
