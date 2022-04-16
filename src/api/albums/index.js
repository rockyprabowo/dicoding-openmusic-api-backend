const AlbumsHandler = require('./handler')
const routes = require('./routes')

/**
 * Albums Plugin - Registration
 *
 * @module api/albums
 */

/**
 * Represents the options for Albums Plugin
 *
 * @typedef {import('../../services/postgresql/albums_service')} AlbumsService
 * @typedef {import('../../validators/base')} Validator
 * @typedef {object} AlbumsPluginOptions
 * @property {AlbumsService} service {@link AlbumsService}
 * @property {Validator} validator Validator for {@link AlbumsPlugin}
 */

/**
 * Albums Plugin object
 *
 * @template T
 * @typedef {import('@hapi/hapi').Plugin<T>} Plugin
 * @type {Plugin<AlbumsPluginOptions>}
 */
const AlbumsPlugin = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, options) => {
    const handler = new AlbumsHandler(options)
    server.route(routes(handler))
  }
}

module.exports = { AlbumsPlugin }
