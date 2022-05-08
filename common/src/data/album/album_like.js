const {
  AlbumLikeDbRow,
  AlbumLikeRequestPayload,
  AlbumLikesCountDbRow,
  AlbumLikesCount
} = require('../../types/data/album_like')

/**
 * OpenMusic API - Album Like data model
 *
 * @module data/album/like
 */

/**
 * Represents an Album Like
 *
 * @memberof module:data/album/like
 */
class AlbumLike {
  static tableName = 'user_album_likes'
  id
  userId
  albumId

  /**
   * Construct an {@link AlbumLike}
   *
   * @param {AlbumLikeRequestPayload} payload Payload
   */
  constructor (payload) {
    this.id = payload.id
    this.albumId = payload.albumId
    this.userId = payload.userId
  }

  /* eslint-disable camelcase */

  /**
   * Maps database result(s) to this data model
   *
   * @param {AlbumLikeDbRow} dbRow Item from database
   * @returns {AlbumLike} This data model
   */
  static mapDBToModel = ({ id, user_id, album_id }) => new AlbumLike({ id, userId: user_id, albumId: album_id })

  /* eslint-enable camelcase */

  /**
   * Maps database count() result(s) into a number
   *
   * @param {AlbumLikesCountDbRow} dbRow Result from database
   * @returns {AlbumLikesCount} Like count casted to number
   */
  static mapLikesCount = ({ likes }) => ({ likes: Number(likes) })
}

module.exports = AlbumLike
