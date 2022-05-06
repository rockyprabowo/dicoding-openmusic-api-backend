const PlaylistsService = require('@openmusic/common/services/postgresql/playlists_service')
const { ExportPlaylistQueueMessage } = require('@openmusic/common/types/data/export_playlist')
const PlaylistExportMailer = require('../mailers/playlist_export_mailer')
const { Message } = require('amqplib')

class ExportPlaylistListener {
  #playlistsService
  #mailer

  /**
   *
   * @param {PlaylistsService} playlistsService Playlists Service
   * @param {PlaylistExportMailer} mailer Mailer
   */
  constructor (playlistsService, mailer) {
    this.#playlistsService = playlistsService
    this.#mailer = mailer
  }

  /**
   * Queue Listener for Export Playlist
   *
   * @param {(Message | null)} message Message from queue
   */
  listen = async (message) => {
    try {
      console.log('Incoming message...')
      const messageContent = message?.content.toString()
      if (messageContent) {
        /** @type {ExportPlaylistQueueMessage} */
        const parsedMessageContent = JSON.parse(messageContent)

        const { targetEmail, playlistId, userId } = parsedMessageContent

        const playlist = await this.#playlistsService.getPlaylistByIdForExport(playlistId, userId)
        const result = await this.#mailer.sendEmail(targetEmail, JSON.stringify({ playlist }))

        console.log(`Playlist ${playlist.id} export request sent to ${result.envelope.to}`)

        return
      }

      throw Error('Message is empty')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = ExportPlaylistListener
