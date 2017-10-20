'use strict'

module.exports = remove
let config = require('../config')

function remove (options) {
  try {
    config.remove(options.remove)
    config.save()
      .then(confirm, handleError)
  } catch (e) {
    console.error('\n' + e.message)
  }
}

function confirm () {
  console.log('\nrecord removed\n')
}

function handleError (error) {
  console.error('\n' + error.message)
}
