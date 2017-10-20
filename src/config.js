'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = {
  get: get,
  save,
  add,
  remove
}

const configPath = path.join(os.homedir(), '.git-user-config.json')
let config
load()

function get () {
  return config
}

function load () {
  try {
    config = require(configPath)
  } catch (e) {
    config = {}
  }
}

function save () {
  return new Promise((resolve, reject) => {
    fs.writeFile(configPath, JSON.stringify(config), (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

function add (record) {
  if (config[record.id]) throw new Error(`Record "${record.id}" already exists.`)
  config[record.id] = {name: record.name, email: record.email}
}

function remove (id) {
  if (!config[id]) throw new Error(`Record "${id}" does not exist.`)
  delete config[id]
}
