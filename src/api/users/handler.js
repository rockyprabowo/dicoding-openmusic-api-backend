const { LifecycleMethod, ResponseObject } = require('~types/api')
const { UsersPluginOptions } = require('~types/api/users')
const { UserRequestPayload } = require('~types/data/user')
/**
 * Users Plugin - Handler class
 *
 * @typedef {import('./routes')} UsersRoutes
 * @typedef {import('@data/user/user')} User
 */

class UsersHandler {
  service
  validator
  /**
   * Construct a new {@link UsersHandler Users Handler} with {@link UsersPluginOptions options}
   *
   * @param {UsersPluginOptions} options Users plugin options
   */
  constructor (options) {
    this.service = options.service
    this.validator = options.validator
  }

  /**
   * Handles `POST` request to add a new {@link User user}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  postUserHandler = async (request, h) => {
    const payload = /** @type {UserRequestPayload} */ (request.payload)

    this.validator.validate(payload)
    const { username, password, fullname } = payload

    const user = await this.service.addUser({ username, password, fullname })

    return h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId: user.id
      }
    }).code(201)
  }

  /**
   * Handles `GET` request to get a {@link User user} by its {@link User.id id}
   *
   * @type {LifecycleMethod}
   * @returns {Promise<ResponseObject>} Response
   */
  getUserByIdHandler = async (request, h) => {
    const { id } = request.params
    const user = await this.service.getUserById(id)

    return h.response({
      status: 'success',
      data: {
        user
      }
    })
  }
}

module.exports = { UsersHandler }
