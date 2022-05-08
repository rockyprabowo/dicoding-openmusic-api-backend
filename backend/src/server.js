const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Jwt = require('@hapi/jwt')
const path = require('path')

const { printAsciiArtLogo, publicCoverArtUrlGenerator } = require('~utils/index')

const AlbumsService = require('@openmusic/common/services/postgresql/albums_service')
const AlbumsLikesService = require('@openmusic/common/services/postgresql/albums_likes_service')
const AlbumValidator = require('~validators/album')

const SongsService = require('@openmusic/common/services/postgresql/songs_service')
const SongValidator = require('~validators/song')

const AuthenticationsService = require('@openmusic/common/services/postgresql/authentications_service')
const AuthenticationValidators = require('~validators/authentication')
const TokenManager = require('~utils/tokenise/token_manager')

const UsersService = require('@openmusic/common/services/postgresql/users_service')
const UserValidator = require('~validators/user')

const PlaylistsService = require('@openmusic/common/services/postgresql/playlists_service')
const PlaylistValidators = require('~validators/playlist')

const PlaylistsCollaborationsService = require('@openmusic/common/services/postgresql/playlists_collaborations_service')
const PlaylistCollaborationValidator = require('~validators/playlist_collaboration')

const ProducerService = require('~services/rabbitmq/producer_service')

const ExportPlaylistValidator = require('~validators/export_playlist')

const ImageUploadValidator = require('~validators/image_upload')

const S3StorageService = require('~services/s3/s3_storage_service')
const LocalStorageService = require('~services/local_storage/local_storage_service')

const CacheService = require('@openmusic/common/services/redis/cache_service')

/**
 * Server module
 *
 * @module server
 */

/**
 * Server object
 *
 * @type {Hapi.Server}
 */
const server = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: {
      origin: ['*']
    }
  }
})

/**
 * Server plugins registrations
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const registerPlugins = async () => {
  const cacheService = new CacheService()
  const songsService = new SongsService(cacheService)
  const albumsService = new AlbumsService(cacheService, songsService)
  const albumsLikesService = new AlbumsLikesService(cacheService, albumsService)
  const authenticationsService = new AuthenticationsService()
  const usersService = new UsersService()
  const playlistsCollaborationsService = new PlaylistsCollaborationsService(cacheService, usersService)
  const playlistsService = new PlaylistsService(cacheService, songsService, playlistsCollaborationsService)
  const producerService = new ProducerService()
  const localImageUploadTarget = path.resolve(__dirname, '../public/uploads/images/')
  const activeStorageService = (process.env.STORAGE_MODE === 's3')
    ? new S3StorageService()
    : new LocalStorageService(
      localImageUploadTarget,
      publicCoverArtUrlGenerator
    )

  /**
   * @param {any} artifacts JWT artifacts
   * @returns {{isValid: boolean, credentials: {id: string}}} Validation result
   */
  const validateJwt = (artifacts) => ({
    isValid: true,
    credentials: {
      id: artifacts.decoded.payload.id
    }
  })

  await server.register(Inert)
  await server.register(Jwt)

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: validateJwt
  })

  await server.register([
    // Developers Documentation Plugin
    {
      plugin: require('./api/devdocs'),
      options: {
        docsPath: path.resolve(__dirname, '../public/devdocs')
      },
      routes: {
        prefix: '/devdocs'
      }
    },
    // Authentications Plugin
    {
      plugin: require('./api/authentications'),
      options: {
        authenticationsService,
        usersService,
        validators: AuthenticationValidators,
        tokenManager: new TokenManager()
      },
      routes: {
        prefix: '/authentications'
      }
    },
    // Users Plugin
    {
      plugin: require('./api/users'),
      options: {
        usersService,
        validator: new UserValidator()
      },
      routes: {
        prefix: '/users'
      }
    },
    // Albums Plugin
    {
      plugin: require('./api/albums'),
      options: {
        albumsService,
        validator: new AlbumValidator()
      },
      routes: {
        prefix: '/albums'
      }
    },
    // Album Cover Art Plugin
    {
      plugin: require('./api/albums/cover_art'),
      options: {
        albumsService,
        storageService: activeStorageService,
        validator: new ImageUploadValidator()
      }
    },
    // Albums Likes Plugin
    {
      plugin: require('./api/albums/likes'),
      options: {
        albumsLikesService
      },
      routes: {
        prefix: '/albums'
      }
    },
    // Songs Plugin
    {
      plugin: require('./api/songs'),
      options: {
        songsService,
        validator: new SongValidator()
      },
      routes: {
        prefix: '/songs'
      }
    },
    // Playlists Collaborations Plugin
    {
      plugin: require('./api/playlists/collaborations'),
      options: {
        playlistsCollaborationsService,
        playlistsService,
        validator: new PlaylistCollaborationValidator()
      },
      routes: {
        prefix: '/collaborations'
      }
    },
    // Export Playlist Plugin
    {
      plugin: require('./api/exports/playlists'),
      options: {
        producerService,
        playlistsService,
        validator: new ExportPlaylistValidator()
      },
      routes: {
        prefix: '/export/playlists'
      }
    }
  ])

  // Playlists Plugins
  await server.register([
    {
      plugin: require('./api/playlists'),
      options: {
        playlistsService,
        validators: PlaylistValidators
      }
    },
    {
      plugin: require('./api/playlists/songs'),
      options: {
        playlistsService,
        validators: PlaylistValidators
      }
    },
    {
      plugin: require('./api/playlists/activities'),
      options: {
        playlistsService,
        validators: PlaylistValidators
      }
    }
  ],
  {
    routes: {
      prefix: '/playlists'
    }
  })

  // Redirect to documentation
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.redirect('/devdocs')
    }
  })

  // Invalid routes
  server.route({
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response({
        status: 'error',
        message: 'Not Found'
      }).code(404)
    }
  })

  return server
}

/**
 * Initialise the server and listen to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const start = async () => {
  printAsciiArtLogo()
  await registerPlugins()
  await server.start()
  console.log(`Server berjalan di: ${server.info.uri}`)
  return server
}

/**
 * Initialise the server without listening to configured host and port
 *
 * @returns {Promise<Hapi.Server>} Hapi server object
 */
const init = async () => {
  await registerPlugins()
  await server.initialize()
  return server
}

module.exports = { start, init }
