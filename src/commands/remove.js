'use strict'

module.exports = remove
let config = require('../config')
let q = require('q')

function remove (options) {
  q.when()
        .then(config.remove.bind(null, options.remove))
        .then(config.save)
        .then(confirm)
        .catch(handleError)
}

function confirm () {
  console.log('\nrecord removed\n')
}

function handleError (error) {
  console.error('\n' + error.message)
}
