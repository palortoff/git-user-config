'use strict'

const config = require('../config')
const exec = require('child_process').exec

module.exports = set

function set (options) {
  const id = options.set
  const obj = config.get()[id]
  if (!obj) throw Error(`Config for ${id} not specified`)

  Object.keys(obj).forEach((key) => {
    setValue(key, obj[key])
      .then(() => {})
      .catch(handleError)
  })
  confirm(obj)
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

function confirm (configuration) {
  console.log('configuration applied:')
  console.log(JSON.stringify(configuration, null, 2))
}

function handleError (error) {
  console.error('\n' + error.message)
}
