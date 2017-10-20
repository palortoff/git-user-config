'use strict'

const configPath = require('./configPath')
module.exports = function () {
  try {
    return require(configPath())
  } catch (e) {
    return {}
  }
}
