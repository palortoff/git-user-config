'use strict'

const EventEmmitter = require('events').EventEmitter

const test = require('tap').test
const mockquire = require('mock-require')
const configModulePath = require.resolve('../../src/config')

test('issues `git config` commands for config', (t) => {
  t.plan(2)

  delete require.cache[configModulePath]
  mockquire(configModulePath, {
    get () {
      return {
        foo: {
          'user.email': 'foo@example.com',
          'user.name': 'foo bar'
        }
      }
    }
  })

  let counter = 0
  const expectedCommands = [
    `git config --local user.email 'foo@example.com'`,
    `git config --local user.name 'foo bar'`
  ]

  const childProcess = Object.create(EventEmmitter.prototype)
  childProcess.exec = function (command) {
    t.is(expectedCommands.includes(command), true)
    counter += 1
    if (counter >= 1) this.emit('close', 0)
  }
  mockquire('child_process', childProcess)

  const set = require('../../src/commands/set')
  set({set: 'foo'})

  mockquire.stopAll()
})
