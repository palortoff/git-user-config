'use strict'

let _ = require('lodash')

module.exports = commandLineOptions

function commandLineOptions () {
  let argv = require('minimist')(process.argv.slice(2))

  let config = {
    list: argv.l || argv.list,
    add: argv.a || argv.add,
    remove: argv.r || argv.remove,
    set: argv.s || argv.set
  }

  requireOptionSanity(config)

  return config
}

function requireOptionSanity (config) {
  requireExactlyOneCommandSet(config)
  requireIdForOption(config, 'remove')
  requireIdForOption(config, 'set')
}

function requireExactlyOneCommandSet (config) {
  let commandFound = false

  _.forEach(['list', 'add', 'remove', 'set'], function (command) {
    if (commandFound && config[command]) throw new Error('Please specify only one command')
    if (config[command]) commandFound = true
  })

  if (!commandFound) throw new Error('No command specified!')
}

function requireIdForOption (config, command) {
  if (config[command] && config[command] === true) throw new Error(`command ${command} requires an id`)
}
