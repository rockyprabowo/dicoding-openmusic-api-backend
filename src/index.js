/**
 * @file index.js is the root file for this project
 * @author Rocky Prabowo
 * @see https://dev.lazycats.id
 */

require('module-alias/register')
require('dotenv').config()

const { start } = require('./server')

start()

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
