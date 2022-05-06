/**
 * Albums Plugin
 *
 * @typedef {import('~api/albums')} AlbumsPlugin
 * @typedef {import('~api/albums/handler').AlbumsHandler} AlbumsHandler
 * @typedef {import('@openmusic/common/services/postgresql/albums_service')} AlbumsService
 * @typedef {import('@openmusic/common/services/storage/base')} StorageService
 * @typedef {import('~services/local_storage/local_storage_service')} LocalStorageService
 * @typedef {import('~services/s3/s3_storage_service')} S3StorageService
 * @typedef {import('~validators/base')} Validator
 * @typedef {import('~validators/image_upload')} ImageUploadValidator
 */

/**
 * Represents the options for {@link AlbumsPlugin}
 *
 * @typedef {object} AlbumsPluginOptions
 * @property {AlbumsService} albumsService Service for {@link AlbumsHandler}
 * @property {Validator} validator Validator for {@link AlbumsHandler}
 * @memberof module:api/albums
 */

/**
 * Represents the options for {@link AlbumCoverArtPlugin}
 *
 * @typedef {object} AlbumCoverArtPluginOptions
 * @property {AlbumsService} albumsService Album Service
 * @property {(LocalStorageService | S3StorageService)} storageService Storage Service
 * @property {ImageUploadValidator} validator Validator
 */

module.exports = {}
