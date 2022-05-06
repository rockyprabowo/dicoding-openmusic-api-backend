const AlbumsLikesService = require('@openmusic/common/services/postgresql/albums_likes_service')

/**
 * @typedef {import('~api/albums/likes/handler').AlbumsLikesHandler} AlbumsLikesHandler
 * @typedef {import('@openmusic/common/services/redis/cache_service')} CacheService
 */

/**
 * Represents the options for {@link AlbumsLikesPlugin}
 *
 * @typedef {object} AlbumsLikesPluginOptions
 * @property {AlbumsLikesService} albumsLikesService Service for {@link AlbumsLikesHandler}
 * @memberof module:api/albums/likes
 */

module.exports = {}
