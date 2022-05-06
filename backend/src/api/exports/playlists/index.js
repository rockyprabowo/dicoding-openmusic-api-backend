const { ExportsPlaylistsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { ExportsPlaylistsPluginOptions } = require('~types/api/exports')

/**
 * OpenMusic API - Export Playlists API
 *
 * @module api/exports/playlists
 */

/**
 * Exports plugin registration object
 *
 * @type {Plugin<ExportsPlaylistsPluginOptions>}
 * @memberof module:api/exports/playlists
 */
const ExportsPlaylistsPlugin = {
  name: 'exports_playlists',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new ExportsPlaylistsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = ExportsPlaylistsPlugin
