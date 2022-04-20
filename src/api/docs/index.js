const { Plugin } = require('~types/api')
const path = require('path')
const fs = require('fs')
/**
 * OpenMusic API - Developer JSDoc Documentations
 *
 * @module api/docs
 */

/**
 * Represents the options for {@link DocsPlugin}.
 *
 * @typedef {object} DocsPluginOptions
 * @property {string} docsPath Documentation path
 * @memberof module:api/docs
 */

/**
 * Documentation plugin
 *
 * @type {Plugin<DocsPluginOptions>}
 */
const DocsPlugin = {
  name: 'documentation',
  version: '1.0.0',
  dependencies: [
    '@hapi/inert'
  ],
  register: async (server, options) => {
    const prefix = server.realm.modifiers.route.prefix
    const docsPath = path.resolve(options.docsPath)

    try {
      fs.statSync(docsPath)

      // Workaround for a 2 years old @hapi/inert bug.
      // See: https://github.com/hapijs/inert/issues/146
      if (prefix) {
        server.route({
          method: 'GET',
          path: '/',
          handler: (request, h) => {
            return h.redirect(prefix + '/')
          }
        })
      }

      server.route({
        method: 'GET',
        path: '/{file*}',
        options: {
          files: {
            relativeTo: docsPath
          }
        },
        handler: {
          directory: {
            path: '.',
            // This property does nothing due to the bug mentioned above.
            redirectToSlash: true
          }
        }
      })

      console.log(`Dokumentasi dapat diakses di: ${server.info.uri + prefix}`)
    } catch (error) {
      console.log('Dokumentasi belum dibangun.')
      console.log('Dokumentasi dapat dibangun dengan menjalankan: npm run docs:build')
      console.log('')
    }
  }
}

module.exports = DocsPlugin
