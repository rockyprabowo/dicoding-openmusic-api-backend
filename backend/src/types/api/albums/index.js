/**
 * Albums Plugin
 *
 * @typedef {import('~api/albums')} AlbumsPlugin
 * @typedef {import('~api/albums/handler').AlbumsHandler} AlbumsHandler
 * @typedef {import('@openmusic/common/services/postgresql/albums_service')} AlbumsService
 * @typedef {import('~validators/base')} Validator
 */

/**
 * Represents the options for {@link AlbumsPlugin}
 *
 * @typedef {object} AlbumsPluginOptions
 * @property {AlbumsService} albumsService Service for {@link AlbumsHandler}
 * @property {Validator} validator Validator for {@link AlbumsHandler}
 * @memberof module:api/albums
 */

module.exports = {}