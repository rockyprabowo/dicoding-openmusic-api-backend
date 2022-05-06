const { PlaylistsCollaborationsHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { PlaylistsCollaborationsPluginOptions } = require('~types/api/playlists/collaborations')

/**
 * OpenMusic API - Playlists Collaborations API Plugin
 *
 * @module api/playlists/collaborations
 */

/**
 * Playlists Collaborations plugin registration object
 *
 * @type {Plugin<PlaylistsCollaborationsPluginOptions>}
 * @memberof module:api/playlists/collaborations
 */
const PlaylistsCollaborationsPlugin = {
  name: 'playlists_collaborations',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new PlaylistsCollaborationsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = PlaylistsCollaborationsPlugin
