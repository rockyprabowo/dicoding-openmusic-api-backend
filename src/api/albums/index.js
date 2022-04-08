const AlbumsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { dependencies }) => {
    const handler = new AlbumsHandler(dependencies)
    server.route(routes(handler))
  }
}
