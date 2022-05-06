const { PlaylistsActivitiesHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { PlaylistsPluginOptions } = require('~types/api/playlists')

/**
 * OpenMusic API - Playlists Activities API
 *
 * @module api/playlists/activities
 */

/**
 * Playlists Activities plugin registration object
 *
 * @type {Plugin<PlaylistsPluginOptions>}
 * @memberof module:api/playlists/activities
 */
const PlaylistsActivitiesPlugin = {
  name: 'playlists_activities',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new PlaylistsActivitiesHandler(options)
    server.route(routes(handler))
  }
}

module.exports = PlaylistsActivitiesPlugin
