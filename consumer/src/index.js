require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })

const amqp = require('amqplib')

const PlaylistService = require('@openmusic/common/services/postgresql/playlists_service')
const SongsService = require('@openmusic/common/services/postgresql/songs_service')
const UsersService = require('@openmusic/common/services/postgresql/users_service')
const PlaylistsCollaborationsService = require('@openmusic/common/services/postgresql/playlists_collaborations_service')
const CacheService = require('@openmusic/common/services/redis/cache_service')

const PlaylistExportMailer = require('./mailers/playlist_export_mailer')
const ExportPlaylistListener = require('./listeners/export_playlist_listener')

const init = async () => {
  const cacheService = new CacheService()
  const usersService = new UsersService(cacheService)
  const songsService = new SongsService(cacheService)
  const playlistsCollaborationsService = new PlaylistsCollaborationsService(cacheService, usersService)

  const playlistsService = new PlaylistService(cacheService, songsService, playlistsCollaborationsService)
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
