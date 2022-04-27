const Song = require('@data/song/song')
const User = require('@data/user/user')
const { nanoid } = require('nanoid')
const { PlaylistRequestPayload, PlaylistDbRow, PlaylistDbRowWithUsername } = require('~types/data/playlist')
const { SongListItem } = require('~types/data/song')

/**
 * OpenMusic API - Playlist data model
 *
 * @module data/playlist
 */

/**
 * @typedef {(Song[] | SongListItem[] | undefined)} SongsData
 */

/**
 *
 */
class Playlist {
  static tableName = 'playlists'
  id
  name
  username

  /** @type {(string | undefined)} */
  #ownerId
  /** @type {(User | undefined)} */
  #owner

  /** @type {(string[] | undefined)} */
  #songIds
  /** @type {SongsData} */
  #songs

  #newlyCreated = true

  get songIds () {
    return this.#songIds
  }

  get songs () {
    return this.#songs
  }

  get ownerId () {
    return this.#ownerId
  }

  get owner () {
    return this.#owner
  }

  /**
   * Songs setter.
   * Sets songs and song IDs.
   *
   * @param {SongsData} songs Songs
   */
  set songs (songs) {
    if (songs && songs?.length > 0) {
      this.#songs = songs
      this.#songIds = songs?.map((song) => song.id)
    }
  }

  /**
   * Owner setter.
   * Sets owner and owner ID.
   *
   * @param {(User | undefined)} owner Owner user object
   */
  set owner (owner) {
    if (owner?.id) {
      this.#owner = owner
      this.#ownerId = owner.id
      this.username = owner.username
    }
  }

  /**
   * Construct a new {@link Playlist}
   *
   * @param {PlaylistRequestPayload} payload Object payload
   */
  constructor (payload) {
    this.id = payload.id ?? Playlist.generateId()
    this.name = payload.name
    this.#ownerId = payload.ownerId
    if (payload.username) {
      this.username = payload.username
    }
    this.songs = payload.songs
  }

  /**
   * Generates a new random `id` for {@link Playlist}
   *
   * @returns {string} Random `id` for {@link Playlist}
   */
  static generateId () {
    return `playlist-${nanoid(16)}`
  }

  /**
   * Maps database result(s) to this data model
   *
   * @param {PlaylistDbRow} dbRow Playlist item from database
   * @returns {Playlist} This data model
   */
  static mapDBToModel = ({ id, name, owner }) => new Playlist({ id, name, ownerId: owner })

  /**
   * Maps database result(s) to this data model, appends owner username via join
   *
   * @param {PlaylistDbRowWithUsername} dbRowWithUsername Playlist item from database
   * @returns {Playlist} This data model
   */
  static mapDBToModelWithUsername = ({ id, name, owner, username }) => new Playlist({ id, name, ownerId: owner, username })

  /**
   * Maps database result(s) to this data model, replace owner ID with username via join
   *
   * @param {PlaylistDbRowWithUsername} dbRowWithUsername Playlist item from database
   * @returns {Playlist} This data model
   */
  static mapDBToPlaylistListItem = ({ id, name, username }) => new Playlist({ id, name, username })

  toJSON () {
    return {
      ...this,
      songs: this.songs
    }
  }
}

module.exports = Playlist
