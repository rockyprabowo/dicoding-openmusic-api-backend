const { AlbumCoverArtHandler } = require('./handler')
const routes = require('./routes')
const { genericPreResponseHandler } = require('~utils')
const { Plugin } = require('~types/api')
const { AlbumCoverArtPluginOptions } = require('~types/api/albums')

/**
 * OpenMusic API - Album Cover Art API
 *
 * @module api/albums/cover_art
 */

/**
 * Album Cover Art plugin registration object
 *
 * @type {Plugin<AlbumCoverArtPluginOptions>}
 * @memberof module:api/albums/cover_art
 */
const AlbumCoverArtPlugin = {
  name: 'album_cover_art',
  version: '1.0.0',
  register: async (server, options) => {
    server.ext('onPreResponse', genericPreResponseHandler)

    const handler = new AlbumCoverArtHandler(options)
    server.route(routes(handler))
  }
}

module.exports = AlbumCoverArtPlugin
