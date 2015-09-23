'use strict';

module.exports = printUsage;

function printUsage() {
    console.log(
        `git-user-config <command> [id]

commands:
  -l --list         list all user records
  -a --add          add a new user record for later use
  -r --remove=<id>  remove a user record from storage
  -s --set=<id>     configure current git repo with the given user record`
    )
}