Do you use different user names and/or email for your github projects, work projects, private personal projects?

Then you use ``git config`` a lot.

With ``git-user-config`` you can save these different users globally and configure a new repo with a single command using the user record id.
No more misspelled email addresses and user names...

# Install

    npm install -g git-user-config

# Add User record for later use

    git-user-config --add

The follow instructions

````
Add new user record

id: user1
name: user 1
email: user_1@domain.com

record saved
````

# Configure git repo to use user record

    git-user-config --set user1

This will call ``git config`` to set user.name and user.email

````
$ git config -l | grep user
user.name=user 1
user.email=user_1@domain.com
````

# List all user records

    git-user-config --list

````
{
  "user1": {
    "name": "user 1",
    "email": "user_1@domain.com"
  },
  "user2": {
    "name": "user 2",
    "email": "user_2@domain.com"
  }
}
````

# Remove a user record

    git-user-config --remove user1