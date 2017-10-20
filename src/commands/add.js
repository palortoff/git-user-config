'use strict'

module.exports = add

const read = require('read')
const config = require('../config')

const record = {id: 'id', name: 'name', email: 'email'}

function add () {
  console.log('Add new user record\n')
  readProperty('id')
    .then(() => readProperty('name'))
    .then(() => readProperty('email'))
    .then(() => config.add(record.id, record))
    .then(config.save)
    .then(confirm)
    .catch(handleError)
}

function readProperty (prop) {
  return new Promise((resolve, reject) => {
    read({prompt: `${prop}:`}, (error, result) => {
      if (error) reject(error)
      record[prop] = result
      resolve()
    })
  })
}

function confirm () {
  console.log('\nrecord saved')
}

function handleError (error) {
  console.error('\n' + error.message)
}
