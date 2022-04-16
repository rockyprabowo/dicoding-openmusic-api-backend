const { SongsHandler } = require('./handler')
const routes = require('./routes')

/**
 * Songs Plugin
 *
 * @module api/songs
 */

/**
 * Represents the options for Songs Plugin
 *
 * @typedef {import('../../services/postgresql/songs_service')} SongsService
 * @typedef {import('../../validators/base')} Validator
 * @typedef {object} SongsPluginOptions
 * @property {SongsService} service {@link SongsService}
 * @property {Validator} validator Validator for {@link AlbumsPlugin}
 */

/**
 * Songs Plugin object
 *
 * @template T
 * @typedef {import('@hapi/hapi').Plugin<T>} Plugin
 * @type {Plugin<SongsPluginOptions>}
 */
const SongsPlugin = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, options) => {
    const handler = new SongsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = { SongsPlugin }
