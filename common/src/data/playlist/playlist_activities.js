const {
  PlaylistActivitiesPayload,
  PlaylistActivitiesItemPayload,
  PlaylistActivitiesDbRow,
  PlaylistActivitiesItemOutput
} = require('../../types/data/playlist')

/**
 * Represents a Playlist Activities
 *
 * @memberof module:data/playlist
 */
class PlaylistActivities {
  static tableName = 'playlist_song_activities'
  playlistId
  activities

  /**
   * Construct a new {@link PlaylistActivities}
   *
   * @param {PlaylistActivitiesPayload} payload Payload
   */
  constructor (payload) {
    this.playlistId = payload.playlistId
    this.activities = payload.activities
  }
}

/**
 * Represents a Playlist Activities Item
 *
 * @memberof module:data/playlist
 */
class PlaylistActivitiesItem {
  id
  playlistId
  songId
  title
  userId
  username
  action
  time
  #newlyCreated = true

  /**
   * Construct a new {@link PlaylistActivitiesItem}
   *
   * @param {PlaylistActivitiesItemPayload} payload Payload
   */
  constructor (payload) {
    if (payload.__fromDB) {
      this.id = payload.id
      this.#newlyCreated = false
    }
    this.playlistId = payload.playlistId
    this.songId = payload.songId
    this.title = payload.title
    this.userId = payload.userId
    this.username = payload.username
    this.action = payload.action
    this.time = payload.time
  }

  /* eslint-disable camelcase */

  /**
   * Maps database result(s) to this data model
   *
   * @param {PlaylistActivitiesDbRow} payload Payload
   * @returns {PlaylistActivitiesItem} This data model
   */
  static mapDBToDataModel = ({ id, playlist_id, song_id, title, user_id, username, action, time }) =>
    new PlaylistActivitiesItem({
      id, playlistId: playlist_id, songId: song_id, title, userId: user_id, username, action, time, __fromDB: true
    })

  /* eslint-enable camelcase */

  /**
   * Maps database result(s) to this data model
   *
   * @param {PlaylistActivitiesDbRow} payload Payload
   * @returns {PlaylistActivitiesItemOutput} This data model
   */
  static mapDataToOutput = ({ username, title, action, time }) => ({ username, title, action, time })
}

module.exports = { PlaylistActivitiesItem, PlaylistActivities }
