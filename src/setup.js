/**
 * Setup module
 *
 * @module setup
 */

const { Pool } = require('pg')
const format = require('pg-format')

/**
 * Create database
 *
 * @returns {Promise<void>}
 */
const createDatabase = async () => {
  // Grab databaseName from PGDATABASE and unset PGDATABASE
  const databaseName = process.env.PGDATABASE
  delete process.env.PGDATABASE

  // Create a new pool with the configuration taken from environment variables (excluding PGDATABSE which is unset)
  const db = new Pool()

  if (databaseName) {
    const result = await db.query('SELECT FROM pg_database WHERE datname = $1', [databaseName])
    if (result.rowCount === 0) {
      console.log(`Database ${databaseName} did not exists yet. Creating...`)
      await db.query(format(`CREATE DATABASE ${(databaseName)}`))
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

module.exports = { createDatabase }
