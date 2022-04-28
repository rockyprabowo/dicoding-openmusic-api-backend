const newman = require('newman')

newman.run({
  collection: require('./collections/Open Music API V2 Test.postman_collection.json'),
  environment: require('./collections/OpenMusic API Test.postman_environment.json'),
  reporters: 'cli'
}).on('start', function (err, args) {
  if (err) {
    throw err
  }
  console.log('Running a collection tests...')
}).on('done', function (err, summary) {
  if (err || summary.error) {
    console.error('Collection run encountered an error.')
    console.error(err)
  } else {
    console.log('Collection run completed.')
  }
})
