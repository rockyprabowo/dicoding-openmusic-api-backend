const { AuthenticationsPluginOptions } = require('~types/api/authentications')
class AuthenticationsHandler {
  service
  validator
  /**
   * Construct a new {@link AlbumsHandler} with {@link AlbumsPluginOptions}
   *
   * @param {AuthenticationsPluginOptions} options Albums plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  postAuthenticationHandler = async () => {}
  putAuthenticationHandler = async () => {}
  deleteAuthenticationHandler = async () => {}
}

module.exports = { AuthenticationsHandler }
