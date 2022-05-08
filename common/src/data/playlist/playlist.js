const Song = require('../../data/song/song')
const User = require('../../data/user/user')
const { nanoid } = require('nanoid')
const {
  PlaylistRequestPayload,
  PlaylistDbRow,
  PlaylistDbRowWithUsername
} = require('../../types/data/playlist')
const { SongListItem } = require('../../types/data/song')

/**
 * OpenMusic API - Playlist data model
 *
 * @module data/playlist
 */

/**
 * Represent a Playlist Song
 *
 * @memberof module:data/playlist
 */
class PlaylistSong {
  static tableName = 'playlists_songs'
}
/**
 * Represents a Playlist
 *
 * @memberof module:data/playlist
 */
class Playlist {
  static tableName = 'playlists'
  id
  name
  #ownerUsername

  /**
   * Playlist cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  static playlistCacheKey = (id) => (`playlists:${id}`)

  /**
   * Playlist owner key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  static playlistOwnerCacheKey = (id) => (`playlists:${id}:owner`)

  /**
   * Playlist songs cache key
   *
   * @param {string} id ID
   * @returns {string} Cache key
   */
  static playlistSongsCacheKey = (id) => (`playlists:${id}:songs`)

  /** @type {(string | undefined)} */
  #ownerId
  /** @type {(User | undefined)} */
  #owner

  /** @type {(string[] | undefined)} */
  #songIds
  /** @type {(Song[] | SongListItem[] | undefined)} */
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
   * @param {(Song[] | SongListItem[] | undefined)} songs Songs
   */
  set songs (songs) {
    if (songs && songs?.length > 0) {
      this.#songs = songs
      this.#songIds = songs?.map((song) => song.id)
    }
  }

  /**
   * Owner setter.
   * Sets owner, owner ID, and owner username.
   *
   * @param {(User | undefined)} owner Owner user object
   */
  set owner (owner) {
    if (owner?.id) {
      this.#owner = owner
      this.#ownerId = owner.id
      this.#ownerUsername = owner.username
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
      this.#ownerUsername = payload.username
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

  /**
   * Maps database result(s) to this data model, replace owner ID with username via join
   *
   * @param {PlaylistDbRowWithUsername} dbRowWithUsername Playlist item from database
   * @returns {Playlist} This data model
   */
  static mapDataToExportOutput = ({ id, name }) => new Playlist({ id, name })

  toJSON () {
    return {
      ...this,
      username: this.#ownerUsername,
      songs: this.songs
    }
  }
}

module.exports = { Playlist, PlaylistSong }
