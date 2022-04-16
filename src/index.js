const { start } = require('./server')
require('dotenv').config()

start()

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})
