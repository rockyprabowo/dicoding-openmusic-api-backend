const Song = require('../../data/song/song')

/**
 * Song related typedefs
 *
 */

/**
 * @typedef {object} SongDbRow
 * @property {string} id ID
 * @property {string} title Title
 * @property {number} year Year
 * @property {string} genre Genre
 * @property {string} performer Performer
 * @property {number} [duration] Duration
 * @property {string} [album_id] Album ID
 * @memberof module:data/song
 */

/**
 * @typedef {object} SongRequestPayload
 * @property {string} [id] ID
 * @property {string} title Title
 * @property {number} year Year
 * @property {string} genre Genre
 * @property {string} performer Performer
 * @property {number} [duration] Duration
 * @property {string} [albumId] Album ID
 * @memberof module:data/song
 */

/**
 * @typedef {object} SongListItem
 * @property {string} id ID
 * @property {string} title Title
 * @property {string} performer Performer
 * @memberof module:data/song
 */

/**
 * @typedef {object} SongsFilterPayload
 * @property {string[]} [ids] Song IDs
 * @property {string} [title] Title
 * @property {string} [performer] Performer
 * @property {string} [albumId] Album ID
 * @memberof module:data/song
 */

/**
 * @typedef {object} CacheableSongCollection
 * @property {Song[] | SongListItem[]} songs Song collection
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/song
 */

/**
 * @typedef {object} CacheableSong
 * @property {Song} song Song collection
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/song
 */

module.exports = {}
