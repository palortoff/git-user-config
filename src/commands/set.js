'use strict'

let config = require('./../config')
let exec = require('child-process-promise').exec

module.exports = set

function set (options) {
  let id = options.set
  let user = config.get()[id]
  if (!user || !user.name || !user.email) throw new Error(`User for ${id} not configured`)

  setUserName(user)
        .then(setUserEmail)
        .then(confirm)
        .catch(handleError)
}

function setUserName (user) {
  return exec(`git config user.name "${user.name}"`)
        .then(function () { return user })
}

function setUserEmail (user) {
  return exec(`git config user.email ${user.email}`)
        .then(function () { return user })
}

function confirm (user) {
  console.log('user configured:')
  console.log(JSON.stringify(user, null, 2))
}

function handleError (error) {
  console.error('\n' + error.message)
}
