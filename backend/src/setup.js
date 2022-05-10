/**
 * Setup module
 *
 * @module setup
 */
const fs = require('fs')
const path = require('path')
const { promises: fsPromise } = require('fs')
const CacheService = require('@openmusic/common/services/redis/cache_service')

/**
 * @typedef {object} CommandCount
 * @property {number} commandCount Command count
 * @property {number} validCommandExecuted Valid command executed count
 */

/** Byte count for {@link keyGenerator} */
const keyGeneratorByteCount = 64

/**
 * Generates a new key for tokens
 *
 * @returns {string} Generated key
 */
const keyGenerator = () => require('crypto').randomBytes(keyGeneratorByteCount).toString('hex')

/**
 * Count RegEx matches against a string
 *
 * @param {string} subject A string
 * @param {RegExp} pattern RegEx Pattern
 * @returns {number} Match count
 */
const countRegExMatches = (subject, pattern) => {
  const regex = pattern
  return ((subject || '').match(regex) || []).length
}

/**
 * Prerequisite checks
 */
const prerequisiteCheck = () => {
  const SecretsMissing = require('@openmusic/common/exceptions/secrets_missing_error')
  const ConfigurationMissing = require('@openmusic/common/exceptions/configuration_missing_error')

  const requiredConfigurations = [
    'HOST', 'PORT',
    'PGHOST', 'PGPORT', 'PGUSER', 'PGPASSWORD', 'PGDATABASE',
    'ACCESS_TOKEN_AGE',
    'RABBITMQ_SERVER',
    'MAIL_HOST', 'MAIL_PORT', 'MAIL_ADDRESS', 'MAIL_PASSWORD',
    'REDIS_SERVER',
    'STORAGE_MODE'
  ]

  const missingConfigurations = []

  if (!process.env.ACCESS_TOKEN_KEY) {
    throw new SecretsMissing('ACCESS_TOKEN_KEY environment variable is missing')
  }

  if (!process.env.REFRESH_TOKEN_KEY) {
    throw new SecretsMissing('REFRESH_TOKEN_KEY environment variable is missing')
  }

  for (const configurationName of requiredConfigurations) {
    if (!process.env[configurationName]) {
      missingConfigurations.push(configurationName)
    }
  }

  if (process.env.STORAGE_MODE === 's3') {
    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new SecretsMissing('AWS_ACCESS_KEY_ID environment variable is missing')
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new SecretsMissing('AWS_SECRET_ACCESS_KEY environment variable is missing')
    }
    if (!process.env.AWS_BUCKET_NAME) {
      missingConfigurations.push('AWS_BUCKET_NAME')
    }
  }

  if (missingConfigurations.length > 0) {
    throw new ConfigurationMissing(`Environment variable is missing: \n\t${missingConfigurations.join('\n\t')}`)
  }
}

/**
 * Handles arguments sent to application entrypoint
 *
 * @type {function(string[]): Promise<CommandCount>}
 */
const handleCommandArguments = async (argv) => {
  let commandCount = 0
  let validCommandExecuted = 0
  const uniqueArgv = [...(new Set(argv.slice(2)))]
  const commandMap = new Map([
    ['--create-db', createDatabase],
    ['--env-generate-keys', generateKeysToEnvFile],
    ['--redis-flushdb', redisFlushDb]
  ])

  for (const command of uniqueArgv) {
    const currentCommand = commandMap.get(command)
    if (currentCommand) {
      try {
        if (currentCommand.constructor.name === 'AsyncFunction') {
          await currentCommand()
        } else {
          currentCommand()
        }
        validCommandExecuted++
      } catch (error) {
        if (error instanceof Error) {
          console.error(error)
          process.exit(1)
        }
      }
    } else {
      console.log(`Warning: invalid command: ${command}`)
    }
    commandCount++
  }

  if (commandCount >= 1 && validCommandExecuted === 0) {
    console.log('Valid commands: ', ...commandMap.keys())
  }

  return { commandCount, validCommandExecuted }
}

const redisFlushDb = async () => {
  const cacheService = new CacheService()
  cacheService.onError((err) => {
    console.error(err)
    process.exit(1)
  })

  const result = await cacheService.flushAll()
  console.log(`Redis database flushed. result = ${result}`)
  await cacheService.disconnect()
}

/**
 * Checks .env file existence, copy .env.defaults to .env if it doesn't exists
 *
 * @param {string} envFile .env path
 * @param {string} envDefaultsFile Default .env path
 * @returns {Promise<void>}
 */
const checkEnvFile = async (envFile, envDefaultsFile) => {
  try {
    await (await fsPromise.open(envFile, 'r')).close()
  } catch (error) {
    console.log(`No ${path.basename(envFile)} file detected.`)
    try {
      await (await fsPromise.open(envDefaultsFile, 'r')).close()
      console.log(`Copying ${path.basename(envDefaultsFile)} to ${path.basename(envFile)}`)
      await fsPromise.copyFile(envDefaultsFile, envFile)
    } catch (error) {
      console.log(`No ${path.basename(envDefaultsFile)} detected`)
    }
  }
}

/**
 * Generates mandatory secret(s) key and place them into local .env file.
 * Because this function are needed with no packages installed, this function SHOULD NOT depend on external packages.
 *
 * @returns {Promise<void>}
 */
const generateKeysToEnvFile = async () => {
  const envFileFd = path.join(__dirname, '../../.env')
  const envFileDefaultsFd = path.join(__dirname, '../../.env.defaults')
  const keys = ['ACCESS_TOKEN_KEY', 'REFRESH_TOKEN_KEY']

  await checkEnvFile(envFileFd, envFileDefaultsFd)

  try {
    for (const key of keys) {
      const envFileContent = fs.readFileSync(envFileFd, { encoding: 'utf-8' })
      const regexEntryExistButEmpty = new RegExp(`${key}=`)
      const regexEntryExist = new RegExp(`${key}=\\w+`)

      const countEntryExistButEmpty = countRegExMatches(envFileContent, regexEntryExistButEmpty)
      const countEntryExist = countRegExMatches(envFileContent, regexEntryExist)

      if (countEntryExist) {
        console.log(`${(countEntryExist > 1 && 'Multiple ') || 'The '}${key} already exists.\n` +
          `${(countEntryExist > 1 && `Please remove every ${key} except the last one and empty its value first.\n`) || ''}` +
          `Skipping any modification to ${key} to prevent secret key mismatch.\n`)
        continue
      }
      const generatedKey = keyGenerator()

      if (countEntryExistButEmpty) {
        if (countEntryExistButEmpty > 1) {
          console.log(`Multiple empty ${key} detected. Please remove any duplicates of ${key} but the last one after completing this command.\n`)
        }
        const newEnvFileContent = envFileContent.replace(regexEntryExistButEmpty, `${key}=${generatedKey}`)
        fs.writeFileSync(envFileFd, newEnvFileContent, { encoding: 'utf-8' })
        console.log(`New key for ${key} generated`)
      } else {
        console.log(`${key} didn't exist. Appending a new key for ${key} to ${envFileFd}.`)
        fs.appendFileSync(envFileFd, `\n${key}=${generatedKey}`, { encoding: 'utf-8' })
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
      process.exit(1)
    }
  }
}

/**
 * Create database for this application
 *
 * @returns {Promise<void>}
 */
const createDatabase = async () => {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') })

  const { Pool } = require('pg')
  const format = require('pg-format')

  // Grab databaseName from PGDATABASE and unset PGDATABASE
  const databaseName = process.env.PGDATABASE
  delete process.env.PGDATABASE

  // Create a new pool with the configuration taken from environment variables (excluding PGDATABSE which is unset)
  const db = new Pool()

  if (databaseName) {
    const result = await db.query('SELECT FROM pg_database WHERE datname = $1', [databaseName])
    if (result.rowCount === 0) {
      console.log(`Database ${databaseName} did not exists yet. Creating...`)
      await db.query(format('CREATE DATABASE %I', databaseName))
      console.log(`Database ${databaseName} created.`)
      return db.end()
    }
    console.log(`Database ${databaseName} already exists.`)
    return db.end()
  }
  console.log('PGDATABASE environment variable is not set. Aborting')
  db.end()
  process.exit(1)
}

module.exports = { prerequisiteCheck, handleCommandArguments }
