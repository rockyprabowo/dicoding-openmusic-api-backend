const redis = require('redis')
/**
 * OpenMusic API - Cache Service (Redis)
 *
 * @module services/redis
 */

/**
 * Represents a caching system on top of Redis
 *
 * @memberof module:services/redis
 */
class CacheService {
  #client

  constructor () {
    this.#client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER
      }
    })

    this.#client.on('error', (error) => {
      console.error(error)
    })

    this.#client.connect()
  }

  /**
   * Handle 'error' event
   *
   * @param {function(Error): void} cb Callback
   */
  onError (cb) {
    this.#client.on('error', cb)
  }

  /**
   * Caches a value with a key
   *
   * @param {string} key Key
   * @param {string} value Value
   * @param {*} expirationInSecond Cache expiration in seconds
   */
  async set (key, value, expirationInSecond = 3600) {
    await this.#client.set(key, value, {
      EX: expirationInSecond
    })
  }

  /**
   * Caches a value with a hashmap
   *
   * @param {string} key Key
   * @param {string} field Field
   * @param {string} value Value
   */
  async hSet (key, field, value) {
    await this.#client.hSet(key, field, value)
  }

  /**
   * Gets a cached value with its key
   *
   * @param {string} key Key
   * @returns {Promise<string>} Value
   */
  async get (key) {
    const result = await this.#client.get(key)

    if (result === null) throw new Error('Cache not found')

    return /** @type {string} */ (result)
  }

  /**
   * Gets a cached value with its key
   *
   * @param {string} key Key
   * @param {string} field Field
   * @returns {Promise<string>} Value
   */
  async hGet (key, field) {
    const result = await this.#client.hGet(key, field)

    if (result === null) throw new Error('Cache not found')

    return /** @type {string} */ (result)
  }

  /**
   * Deletes a cached valued with its key
   *
   * @param {string} key Key
   * @returns {Promise<number>} Value
   */
  async delete (key) {
    return await this.#client.del(key)
  }

  /**
   * Deletes a cached valued with its key
   *
   * @param {string} key Key
   * @param {string} field Field
   * @returns {Promise<number>} Value
   */
  async hDelete (key, field) {
    return await this.#client.hDel(key, field)
  }

  /**
   * Drops caches by keys
   *
   * @param {Array<string>} cacheKeys Cache keys to delete
   * @returns {Promise<void>}
   */
  async dropCaches (cacheKeys) {
    for (const cacheKey of cacheKeys) {
      await this.delete(cacheKey)
    }
  }

  /**
   * Set expiration of a key
   *
   * @param {string} key Key
   * @param {number} expirationInSecond Cache expiration in seconds
   * @returns {Promise<void>}
   */
  async expire (key, expirationInSecond = 3600) {
    await this.#client.expire(key, expirationInSecond)
  }

  /**
   * Flushes redis database
   */
  async flushAll () {
    return await this.#client.flushAll()
  }

  /**
   * Connect to redis database
   */
  async connect () {
    return await this.#client.connect()
  }

  /**
   * Disconnect from redis database
   */
  async disconnect () {
    return await this.#client.disconnect()
  }
}

module.exports = CacheService
