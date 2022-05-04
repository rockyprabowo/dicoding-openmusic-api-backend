/**
 * @typedef {object} UserDbRow
 * @property {string} id ID
 * @property {string} username Username
 * @property {string} password Hashed Password
 * @property {string} fullname Full name
 */

/**
 * @typedef {object} UserDbRowWithoutPassword
 * @property {string} id ID
 * @property {string} username Username
 * @property {string} fullname Full name
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
 */

module.exports = {}
