const { PlaylistActivitiesPayload, PlaylistActivitiesItemPayload, PlaylistActivitiesDbRow } = require('~types/data/playlist')

class PlaylistActivities {
  playlistId
  activities

  /**
   *
   * @param {PlaylistActivitiesPayload} payload Payload
   */
  constructor (payload) {
    this.playlistId = payload.playlistId
    this.activities = payload.activities
  }
}

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
   * @param {PlaylistActivitiesItemPayload} payload Payload
   */
  constructor (payload) {
    if (payload.__fromDB) {
      this.id = payload.id
      this.#newlyCreated = false
    }
    this.username = payload.username
    this.playlistId = payload.playlistId
    this.songId = payload.songId
    this.title = payload.title
    this.userId = payload.userId
    this.action = payload.action
    this.time = payload.time
  }

  /* eslint-disable camelcase */
  /**
   * @param {PlaylistActivitiesDbRow} payload Payload
   * @returns {PlaylistActivitiesItem} This data model
   */
  static mapDBToDataModel = ({ id, playlist_id, song_id, title, user_id, username, action, time }) =>
    new PlaylistActivitiesItem({ id, playlistId: playlist_id, songId: song_id, title, userId: user_id, username, action, time, __fromDB: true })
  /* eslint-enable camelcase */
}

module.exports = { PlaylistActivitiesItem, PlaylistActivities }
