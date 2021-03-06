/**
 * Album likes related typedefs
 *
 */

/**
 * @typedef {object} AlbumLikeDbRow
 * @property {string} [id] ID
 * @property {string} user_id User ID
 * @property {string} album_id Album ID
 * @memberof module:data/album/likes
 */

/**
 * @typedef {object} AlbumLikeRequestPayload
 * @property {string} [id] ID
 * @property {string} userId User ID
 * @property {string} albumId Album ID
 * @memberof module:data/album/likes
 */

/**
 * @typedef {object} AlbumLikesCountDbRow
 * @property {string} likes Like count
 * @memberof module:data/album/likes
 */

/**
 * @typedef {object} AlbumLikesCount
 * @property {number} likes Like count
 * @memberof module:data/album/likes
 */

/**
 * @typedef {object} CacheableAlbumLikesCount
 * @property {number} likes Like count
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/album/likes
 */

module.exports = {}
