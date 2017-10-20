'use strict'

const config = require('./../config')
const exec = require('child_process').exec

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

function setValue (prop, val) {
  return new Promise((resolve, reject) => {
    const proc = exec(`git config --local ${prop} '${val}'`)
    proc.on('error', (err) => reject(err))
    proc.on('close', (code) => {
      if (code !== 0) return reject(Error(`Invalid result code: ${code}`))
      resolve()
    })
  })
}

function setUserName (user) {
  return setValue('user.name', user.name).then(() => user)
}

function setUserEmail (user) {
  return setValue('user.email', user.email).then(() => user)
}

function confirm (user) {
  console.log('user configured:')
  console.log(JSON.stringify(user, null, 2))
}

function handleError (error) {
  console.error('\n' + error.message)
}
