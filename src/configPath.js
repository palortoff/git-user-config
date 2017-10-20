'use strict'

module.exports = function () {
  const os = require('os')
  const path = require('path')
  return path.join(os.homedir(), '.git-user-config.json')
}
