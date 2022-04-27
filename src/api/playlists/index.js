const { PlaylistsPluginOptions } = require('~types/api/playlists')
const { Plugin } = require('~types/api')
const { PlaylistsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('@utils')

/**
 * OpenMusic API - Playlists API
 *
 * @module api/playlists
 */

/**
 * Playlists plugin registration object
 *
 * @type {Plugin<PlaylistsPluginOptions>}
 * @memberof module:api/playlists
 */
const PlaylistsPlugin = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new PlaylistsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = PlaylistsPlugin
