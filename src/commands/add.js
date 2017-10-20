'use strict'

module.exports = add

const read = require('read')
const config = require('../config')

function add () {
  console.log('Add new user record\n')
  read({prompt: 'Identifier:'}, (err, id) => {
    if (err) return handleError(err)
    console.log('\nEnter property names like `user.email`')
    readProperties((err, record) => {
      if (err) return handleError(err)
      config.add(id, record)
      config.save()
        .then(confirm)
        .catch(handleError)
    })
  })
}

function readProperties (cb) {
  const record = {}
  loop()
  function loop () {
    read({prompt: 'Property name (none to end):'}, (err, prop) => {
      if (err) return cb(err)
      if (prop.trim().length === 0) return cb(null, record)
      read({prompt: 'Value:'}, (err, val) => {
        if (err) return cb(err)
        record[prop] = val
        loop()
      })
    })
  }
}

function confirm () {
  console.log('\nrecord saved')
}

function handleError (error) {
  console.error('\n' + error.message)
}
