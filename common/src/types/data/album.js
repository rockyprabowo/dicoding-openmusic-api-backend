const Album = require('../../data/album/album')

/**
 * @typedef {object} AlbumDbRow
 * @property {string} [id] ID
 * @property {string} name Name
 * @property {number} year Year
 * @property {string} [cover_url] Cover URL
 * @memberof module:data/album
 */

/**
 * @typedef {object} AlbumRequestPayload
 * @property {string} [id] ID
 * @property {string} name Name
 * @property {number} year Year
 * @property {string} [coverUrl] Cover URL
 * @memberof module:data/album
 */

/**
 * @typedef {object} CacheableAlbumCollection
 * @property {Album[]} albums Album collection
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/album
 */

/**
 * @typedef {object} CacheableAlbum
 * @property {Album} album Album
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/album
 */

module.exports = {}
