/**
 * User related typedefs
 *
 */

/**
 * @typedef {object} UserDbRow
 * @property {string} id ID
 * @property {string} username Username
 * @property {string} password Hashed Password
 * @property {string} fullname Full name
 * @memberof module:data/user
 */

/**
 * @typedef {object} UserDbRowWithoutPassword
 * @property {string} id ID
 * @property {string} username Username
 * @property {string} fullname Full name
 * @memberof module:data/user
 */

/**
 * @typedef {object} UserRequestPayload
 * @property {string} [id] ID
 * @property {string} username Username
 * @property {string} [password] Plaintext password
 * @property {string} [hashedPassword] Hashed password
 * @property {string} fullname Full name
 * @property {boolean} [__fromDb] Identify whether this payload came from database
 * @memberof module:data/user
 * @memberof module:data/user
 */

module.exports = {}
