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
   * Gets a cached value with its key
   *
   * @param {string} key Key
   * @returns {Promise<string>} Value
   */
  async get (key) {
    const result = await this.#client.get(key)

    if (result === null) throw new Error('Cache not found')

    return result
  }

  /**
   * Deletes a cached valued with its key
   *
   * @param {string} key Key
   * @returns {Promise<number>} Value
   */
  delete (key) {
    return this.#client.del(key)
  }
}

module.exports = CacheService
