/**
 * @file index.js is the root file for this project
 * @author Rocky Prabowo
 * @see https://dev.lazycats.id
 */

const { prerequisiteCheck, handleCommandArguments } = require('./setup')

handleCommandArguments(process.argv).then((result) => {
  if (result.commandCount === 0) {
    require('module-alias/register')
    require('dotenv').config()

    prerequisiteCheck()
    require('./server').start()
  }
})

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})
