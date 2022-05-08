const Song = require('../../data/song/song')
const User = require('../../data/user/user')

/**
 * Playlist related typedefs
 *
 */

/**
 * @typedef {import('../../data/playlist/playlist').Playlist} Playlist
 * @typedef {import('../../data/playlist/playlist_activities').PlaylistActivities} PlaylistActivities
 */

/**
 * @typedef {object} PlaylistDbRow
 * @property {string} id ID
 * @property {string} name Name
 * @property {string} owner Owner ID
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistDbRowWithUsername
 * @property {string} id ID
 * @property {string} name Name
 * @property {string} owner Owner ID
 * @property {string} username Owner ID
 * @memberof module:data/playlist
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
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistSongRequestPayload
 * @property {string} songId Song ID
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistActivitiesDbRow
 * @property {number} id ID
 * @property {string} playlist_id Playlist ID
 * @property {string} song_id Song ID
 * @property {string} [title] Song title
 * @property {string} user_id User ID
 * @property {string} [username] Username
 * @property {("add" | "delete")} action Action
 * @property {Date} time Timestamp
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistActivitiesItemPayload
 * @property {number} [id] ID
 * @property {string} playlistId Playlist ID
 * @property {string} songId Song ID
 * @property {string} [title] Song title
 * @property {string} userId User ID
 * @property {string} [username] Username
 * @property {("add" | "delete")} action Action
 * @property {Date} [time] Timestamp
 * @property {boolean} [__fromDB] Identify whether this payload came from database
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistActivitiesPayload
 * @property {string} playlistId Playlist ID
 * @property {(PlaylistActivitiesItemPayload[] | PlaylistActivitiesItemOutput[])} activities Activities
 * @memberof module:data/playlist
 */

/**
 * @typedef {object} PlaylistActivitiesItemOutput
 * @property {string} [username] Username
 * @property {string} [title] Song title
 * @property {("add" | "delete")} action Action
 * @property {Date} [time] Timestamp
 * @memberof module:data/playlist
 */

/**
 * @typedef {object } CacheablePlaylist
 * @property {Playlist} playlist Playlist
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/playlist
 */

/**
 * @typedef {object } CacheablePlaylistActivities
 * @property {PlaylistActivities} playlistActivities Playlist Activities
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/playlist
 */

/**
 * @typedef {object } CacheablePlaylists
 * @property {Playlist[]} playlists Playlists
 * @property {boolean} __fromCache Taken from cache
 * @memberof module:data/playlist
 */

module.exports = {}
