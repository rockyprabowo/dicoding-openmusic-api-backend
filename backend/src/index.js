/**
 * @file index.js is the root file for this project
 * @author Rocky Prabowo
 * @see https://dev.lazycats.id
 */

const path = require('path')
const { prerequisiteCheck, handleCommandArguments } = require('./setup')

handleCommandArguments(process.argv).then(
  (result) => {
    if (result.commandCount === 0) {
      require('module-alias')(path.join(__dirname, '/..')) // Register module alias relative to this script location
      require('dotenv').config({ path: path.join(__dirname, '../../.env') }) // Locate .env on the root project directory

      prerequisiteCheck()
      require('./server').start()
    }
  },
  (error) => {
    console.error(error)
    process.exit(1)
  })
