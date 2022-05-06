const amqp = require('amqplib')
const PlaylistService = require('@openmusic/common/services/postgresql/playlists_service')
const PlaylistExportMailer = require('./mailers/playlist_export_mailer')
const ExportPlaylistListener = require('./listeners/export_playlist_listener')

const init = async () => {
  const playlistsService = new PlaylistService()
  const mailer = new PlaylistExportMailer()
  const exportPlaylistListener = new ExportPlaylistListener(playlistsService, mailer)

  const connection = await amqp.connect(/** @type {string} */ (process.env.RABBITMQ_SERVER))
  const channel = await connection.createChannel()

  await channel.assertQueue('export:playlist', {
    durable: true
  })

  channel.consume('export:playlist', exportPlaylistListener.listen, { noAck: true })

  console.log('Consumer app ready.')
}

init()
