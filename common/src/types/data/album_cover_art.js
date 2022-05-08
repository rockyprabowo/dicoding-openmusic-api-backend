const stream = require('stream')

/**
 * Album cover art related typedefs
 *
 */

/**
 * @typedef {object} AlbumCoverArtRequestPayload
 * @property {(stream.Readable & {hapi: {filename: string, headers: object}})} cover Cover art file
 * @memberof module:data/album/cover_art
 */
module.exports = {}
