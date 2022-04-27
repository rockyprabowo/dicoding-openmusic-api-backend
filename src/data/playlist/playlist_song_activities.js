const { PlaylistActivityPayload, PlaylistActivityDbRow } = require('~types/data/playlist')

class PlaylistActivity {
  id
  playlistId
  songId
  userId
  action
  time
  #newlyCreated = true

  /**
   * @param {PlaylistActivityPayload} payload Payload
   */
  constructor (payload) {
    if (payload.__fromDB) {
      this.id = payload.id
      this.#newlyCreated = false
    }
    this.playlistId = payload.playlistId
    this.songId = payload.songId
    this.userId = payload.userId
    this.action = payload.action
    this.time = payload.time
  }

  /* eslint-disable camelcase */
  /**
   * @param {PlaylistActivityDbRow} payload Payload
   * @returns {PlaylistActivity} This data model
   */
  static mapDBToDataModel = ({ id, playlist_id, song_id, user_id, action, time }) =>
    new PlaylistActivity({ id, playlistId: playlist_id, songId: song_id, userId: user_id, action, time, __fromDB: true })
  /* eslint-enable camelcase */
}

module.exports = PlaylistActivity
