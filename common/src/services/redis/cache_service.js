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
  onError = (cb) => {
    this.#client.on('error', cb)
  }

  /**
   * Connect to redis database
   *
   * @returns {Promise<void>}
   */
  connect = async () => {
    return await this.#client.connect()
  }

  /**
   * Disconnect from redis database
   *
   * @returns {Promise<void>}
   */
  disconnect = async () => {
    return await this.#client.disconnect()
  }

  /**
   * Caches a value with a key
   *
   * @param {string} key Key
   * @param {string} value Value
   * @param {number} expirationInSecond Cache expiration in seconds
   * @returns {Promise<(string | null)>} Set command reply
   */
  set = async (key, value, expirationInSecond = 3600) => {
    return await this.#client.set(key, value, {
      EX: expirationInSecond
    })
  }

  /**
   * Caches a value with a hashmap
   *
   * @param {string} hashMapKey Key
   * @param {string} hashMapField Field
   * @param {string} value Value
   * @returns {Promise<number>} Field added count
   */
  hSet = async (hashMapKey, hashMapField, value) => {
    return await this.#client.hSet(hashMapKey, hashMapField, value)
  }

  /**
   * Caches a set of values to a set
   *
   * @param {string} setKey Key
   * @param {string} value Value
   * @returns {Promise<number>} Element added count
   */
  sAdd = async (setKey, value) => {
    return await this.#client.sAdd(setKey, value)
  }

  /**
   * Gets a cached value with its key
   *
   * @param {string} key Key
   * @returns {Promise<(string | undefined)>} Value
   */
  get = async (key) => {
    const result = await this.#client.get(key)

    if (result === null) throw new Error('Cache not found')

    return result
  }

  /**
   * Gets a cached value with its key
   *
   * @param {string} hashMapKey Key
   * @param {string} hashMapField Field
   * @returns {Promise<(string | undefined)>} Value
   */
  hGet = async (hashMapKey, hashMapField) => {
    const result = await this.#client.hGet(hashMapKey, hashMapField)

    if (result === null) throw new Error('Cache not found')

    return result
  }

  /**
   * Checks if value is the member of a set
   *
   * @param {string} setKey Key
   * @param {string} value Value
   * @returns {Promise<boolean>} Value exists
   */
  sIsMember = async (setKey, value) => {
    return await this.#client.sIsMember(setKey, value)
  }

  /**
   * Deletes a cached valued with its key
   *
   * @param {(string | string[])} keys Key(s)
   * @returns {Promise<number>} Deleted keys count
   */
  delete = async (keys) => {
    return await this.#client.del(keys)
  }

  /**
   * Deletes a cached valued with its key
   *
   * @param {string} hashMapKey Key
   * @param {string} hashMapField Field
   * @returns {Promise<number>} Deleted field count
   */
  hDelete = async (hashMapKey, hashMapField) => {
    return await this.#client.hDel(hashMapKey, hashMapField)
  }

  /**
   * Removes a set of values within a set
   *
   * @param {string} setKey Key
   * @param {string} value Value
   * @returns {Promise<number>} Element removed count
   */
  sRem = async (setKey, value) => {
    return await this.#client.sRem(setKey, value)
  }

  /**
   * Drops caches by keys
   *
   * @param {Array<string>} keys Cache keys to delete
   * @returns {Promise<number>} Deleted keys count
   */
  dropCaches = async (keys) => {
    let deleted = 0
    for (const cacheKey of keys) {
      deleted += await this.delete(cacheKey)
    }
    return deleted
  }

  /**
   * Set expiration of a key
   *
   * @param {string} key Key
   * @param {number} expirationInSecond Cache expiration in seconds
   * @returns {Promise<boolean>} Status
   */
  expire = async (key, expirationInSecond = 3600) => {
    return await this.#client.expire(key, expirationInSecond)
  }

  /**
   * Flushes redis database
   *
   * @returns {Promise<string>} Status
   */
  flushAll = async () => {
    return await this.#client.flushAll()
  }
}

module.exports = CacheService
