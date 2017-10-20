'use strict'

module.exports = list

var config = require('../config')

function list () {
  console.log('Saved records:')
  console.log(JSON.stringify(config.get(), null, 2))
}
