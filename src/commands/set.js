'use strict';

let config = require('./../config');
let exec = require('child_process').exec;

module.exports = set;

function set(options) {
    let id = options.set;
    let user = config.get()[id];
    if (!user || !user.name || !user.email) throw new Error(`User for ${id} not configured`);

    try {
        exec(`git config user.name ${user.name}`, handleError);
        exec(`git config user.email ${user.email}`, handleError);

        console.log("user configured:");
        console.log(JSON.stringify(user, null, 2));
    } catch (e) {
        console.error(error.message);
    }
}

//noinspection JSUnusedLocalSymbols
function handleError(error, stdout, stderr) {
    if (!!stderr) throw new Error(stderr);
    if (error) throw error;
}