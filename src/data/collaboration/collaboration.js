const { nanoid } = require('nanoid')
const { CollaborationRequestPayload, CollaborationDbRow } = require('~types/data/collaboration')

/**
 * Represents a Collaboration
 *
 * @module data/collaboration
 */
class Collaboration {
  static tableName = 'collaborations'
  id
  playlistId
  userId

  /**
   * Construct a new {@link Collaboration}
   *
   *@param {CollaborationRequestPayload} payload Payload
   */
  constructor (payload) {
    this.id = payload.id ?? Collaboration.generateId()
    this.playlistId = payload.playlistId
    this.userId = payload.userId
  }

  /**
   * Generates a new random `id` for {@link Album}
   *
   * @returns {string} Random `id` for {@link Album}
   */
  static generateId () {
    return `collaboration-${nanoid(16)}`
  }

  /* eslint-disable camelcase */
  /**
   * @param {CollaborationDbRow} dbRow Item from database
   * @returns {Collaboration} This data model
   */
  static mapDBToModel = ({ id, playlist_id, user_id }) => new Collaboration({ id, playlistId: playlist_id, userId: user_id })

  /* eslint-enable camelcase */
}

module.exports = Collaboration
