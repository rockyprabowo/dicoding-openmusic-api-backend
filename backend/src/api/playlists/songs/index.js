const { PlaylistsSongsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')

/**
 * OpenMusic API - Playlists API
 *
 * @module api/playlists/songs
 */

/**
 * Playlists plugin registration object
 *
 * @type {Plugin<PlaylistsPluginOptions>}
 * @memberof module:api/playlists/songs
 */
const PlaylistsSongsPlugin = {
  name: 'playlists_songs',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new PlaylistsSongsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = PlaylistsSongsPlugin
