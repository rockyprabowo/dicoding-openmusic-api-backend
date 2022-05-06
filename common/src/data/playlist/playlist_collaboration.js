const { nanoid } = require('nanoid')
const {
  PlaylistCollaborationRequestPayload,
  PlaylistCollaborationDbRow
} = require('../../types/data/playlist_collaboration')

/**
 * Represents a Playlist Collaboration
 *
 * @module data/collaboration
 */
class PlaylistCollaboration {
  static tableName = 'playlists_collaborations'
  id
  playlistId
  userId

  /**
   * Construct a new {@link PlaylistCollaboration}
   *
   *@param {PlaylistCollaborationRequestPayload} payload Payload
   */
  constructor (payload) {
    this.id = payload.id ?? PlaylistCollaboration.generateId()
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
   * @param {PlaylistCollaborationDbRow} dbRow Item from database
   * @returns {PlaylistCollaboration} This data model
   */
  static mapDBToModel = ({ id, playlist_id, user_id }) => new PlaylistCollaboration({ id, playlistId: playlist_id, userId: user_id })

  /* eslint-enable camelcase */
}

module.exports = PlaylistCollaboration
