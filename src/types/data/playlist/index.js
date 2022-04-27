const Song = require('@data/song/song')
const User = require('@data/user/user')

/**
 * @typedef {object} PlaylistDbRow
 * @property {string} id ID
 * @property {string} name Name
 * @property {string} owner Owner ID
 */

/**
 * @typedef {object} PlaylistDbRowWithUsername
 * @property {string} id ID
 * @property {string} name Name
 * @property {string} owner Owner ID
 * @property {string} username Owner ID
 */

/**
 * @typedef {object} PlaylistRequestPayload
 * @property {string} [id] Playlist ID
 * @property {string} name Playlist name
 * @property {string} [ownerId] Playlist owner ID
 * @property {string} [username] Playlist owner username
 * @property {User} [owner] Playlist owner ID
 * @property {string[]} [songIds] Song IDs
 * @property {Song[]} [songs] Songs
 */

/**
 * @typedef {object} PlaylistSongRequestPayload
 * @property {string} songId Song ID
 */

/**
 * @typedef {object} PlaylistActivityDbRow
 * @property {number} id ID
 * @property {string} playlist_id Playlist ID
 * @property {string} song_id Song ID
 * @property {string} user_id User ID
 * @property {("add" | "delete")} action Action
 * @property {Date} time Timestamp
 */

/**
 * @typedef {object} PlaylistActivityPayload
 * @property {number} [id] ID
 * @property {string} playlistId Playlist ID
 * @property {string} songId Song ID
 * @property {string} userId User ID
 * @property {("add" | "delete")} action Action
 * @property {Date} time Timestamp
 * @property {boolean} __fromDB Identify whether this payload came from database
 */

module.exports = {}
