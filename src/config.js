'use strict'

let homeDir = require('home-dir')
let qfs = require('q-io/fs')

module.exports = {
  get: get,
  save,
  add,
  remove
}

let configPath = homeDir('/.git-user-config.json')
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
  return qfs.write(configPath, JSON.stringify(config))
}

function add (record) {
  if (config[record.id]) throw new Error(`Record "${record.id}" already exists.`)
  config[record.id] = {name: record.name, email: record.email}
}

function remove (id) {
  if (!config[id]) throw new Error(`Record "${id}" does not exist.`)
  delete config[id]
}
