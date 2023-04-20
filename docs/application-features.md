# Application overview

Users are imported into Auth0 in batches of ~ 500KB

Each batch describes ~ 1335 users

_Creating_ a batch of users in Auth0 takes ~ 4 minutes

_Updating_ a batch of users in Auth0 takes ~ 14 minutes

## Starting with `npm start`

- Application starts
- Exports all users from THE UMS and imports them into Auth0
- Exports users from THE UMS _changed_ since application start and imports them into Auth0
- Exports users from THE UMS _created_ since application start and imports them into Auth0
- Generates validation JSON
- Application stops

By default, import into Auth0 has the `upsert` flag set as `true` so the application can be run _once_ or _more_ but be aware that _creating_ takes much less time in Auth0 than _updating_ so any second or additional run will take longer

Preferably, for a second or additional run use either

1. `npm run start:by-date`
2. `npm run start:by-date-changed`
3. `npm run start:by-date-created`

Each has its own Dockerfile and exports a different set of users, which will be significantly smaller than that produced by `npm start` and take much less time

## Starting with `npm run start:by-date`

Build the image using Dockerfile `by-date.Dockerfile`

Add the environment variable `SINCE` which is a UTC datetime _in seconds_[^1]

- Application starts
- Exports users from THE UMS _changed_ since `SINCE` and imports them into Auth0
- Exports users from THE UMS _created_ since `SINCE` and imports them into Auth0
- Generates validation JSON
- Application stops

To re-run, either re-use `SINCE` or amend the value to a more recent UTC datetime

## Starting with `npm run start:by-date-changed`

Build the image using Dockerfile `by-date-changed.Dockerfile`

Add the environment variable `SINCE` which is a UTC datetime _in seconds_[^1]

- Application starts
- Exports users from THE UMS _changed_ since `SINCE` and imports them into Auth0
- Generates validation JSON
- Application stops

As with `npm run start:by-date` and `npm run start:by-date-created`, to _re-run_ either re-use `SINCE` or amend the value to a more recent UTC datetime

## Starting with `npm run start:by-date-created`

Build the image using Dockerfile `by-date-created.Dockerfile`

Add the environment variable `SINCE` which is a UTC datetime _in seconds_[^1]

- Application starts
- Exports users from THE UMS _created_ since `SINCE` and imports them into Auth0
- Generates validation JSON
- Application stops

As with `npm run start:by-date` and `npm run start:by-date-changed`, to _re-run_ either re-use `SINCE` or amend the value to a more recent UTC datetime

## Starting with `npm run validate`

All of the tasks have a step to _generate validation JSON_ which takes a few seconds to compare users according to particular criteria before writing JSON files

You can also build the image using Dockerfile `validate.Dockerfile`

With additional configuration the application can push the validation JSON files into GitHub

You will need

- A GitHub user
- A GitHub personal access token
- A GitHub repository

The application uses _Git LFS_ since the validation JSON files _may be_ too large for Git

**Note** that the validation JSON files are _encrypted_ and must be _decrypted_ after they are pulled from GitHub

Add the environment variables

- `GIT_USER_NAME` which, for me, is "Jonathan Perry"
- `GIT_USER_EMAIL` which, again for me, is "jonathanperry@sequencemedia.net"
- `GIT_USER_ID` is a GitHub user login ID (I am "sequencemedialimited")
- The `GIT_REPOSITORY` value is _part of_ the HTTPS address of the repository for these JSON files
- A `GIT_PERSONAL_ACCESS_TOKEN` which must be created in GitHub for the GitHub user `GIT_USER_ID`

### `GIT_REPOSITORY` environment variable

The value of the `GIT_REPOSITORY` environment variable is an HTTPS address _excluding `https://`_

In other words, if the HTTPS address for the repository is

```
https://github.com/THE-Engineering/validation-json-files.git
```

Then the value the value of `GIT_REPOSITORY` environment variable should be

```
github.com/THE-Engineering/validation-json-files.git
```

(The required URL is assembled in code from `GIT_REPOSITORY` and other environment variables)

### `GIT_PERSONAL_ACCESS_TOKEN` environment variable

The `GIT_PERSONAL_ACCESS_TOKEN` should allow reading and writing to `GIT_REPOSITORY` for the GitHub user `GIT_USER_ID`

1. Create a Fine Grained token with an expiration of 30 days
2. Grant it _Repository Access_ to `GIT_REPOSITORY`
![Repository Access](images/git-personal-access-token-repository-access.png)
3. Grant it read and write _Permissions_ for _"Contents"_
![Permissions](images/git-personal-access-token-permissions.png)

## Removing users

You can remove users from Auth0

- `npm run remove-by-users`
- `npm run remove-by-users-imports`
- `npm run remove-by-users-exports`

These tasks may only be useful in the _development environment_ in which case you must [open a secure tunnel to MariaDB using the bastion in AWS](opening-a-tunnel.md)

In each case

- You must supply a JSON file _containing the users to remove_
- The file must be _encrypted_

There are tasks for generating these JSON files, too

### `npm run remove-by-users`

[_Connect to the bastion in AWS_](open-a-tunnel.md)

Generate the _users JSON file_

Users are exported from MariaDB

```bash
npm run users
```

By default this writes the _users JSON file_ to `./json/users.json`

Remove those users

```bash
npm run remove-by-users
```

By default this reads the _users JSON file_ from `./json/users.json`

Each user takes ~ 1.75 seconds to remove from Auth0

- You can also generate the _users JSON file_ with `npm run users-by-date-changed`
- You can also generate the _users JSON file_ with `npm run users-by-date-created`


The _users JSON file_ path can be given with the environment variable `USERS_JSON_FILE`

```bash
USERS_JSON_FILE="../users.json"
npm run remove-by-users
```

Otherwise, with the command line argument `--USERS_JSON_FILE`

```bash
npm run remove-by-users -- \
  --USERS_JSON_FILE "../users.json"
```

### `npm run remove-by-users-imports`

[_Connect to the bastion in AWS_](open-a-tunnel.md)

Users are exported from MariaDB

Generate the _users JSON file_

```bash
npm run users-imports
```

By default this writes the _users JSON files_ to _directory_ `.users-imports`

Remove those users

```bash
npm run remove-by-users-imports
```

By default this reads the _users JSON files_ from _directory_ `.users-imports`

Each user takes ~ 1.75 seconds to remove from Auth0

The _directory_ path can be given with the environment variable `USERS_IMPORTS_PATH`

```bash
USERS_IMPORTS_PATH="../.users-imports"
npm run remove-by-users-imports
```

Otherwise, with the command line argument `--USERS_IMPORTS_PATH`

```bash
npm run remove-by-users-imports -- \
  --USERS_IMPORTS_PATH "../.users-imports"
```

### `npm run remove-by-users-exports`

_You need not connect to the bastion in AWS_

Users are exported from Auth0

Generate the _users JSON file_

```bash
npm run users-exports
```

By default this writes the _users JSON file_ to `.users-exports/users.json`

Remove those users

```bash
npm run remove-by-users-exports
```

By default this reads the _users JSON file_ from `.users-exports/users.json`

Each user takes ~ 1.75 seconds to remove from Auth0

The _users JSON file_ path can be given with the environment variable `USERS_EXPORTS_PATH`

```bash
USERS_EXPORTS_PATH="../.users-exports/users.json"
npm run remove-by-users-exports
```

Otherwise, with the command line argument `--USERS_EXPORTS_PATH`

```bash
npm run remove-by-users-exports -- \
  --USERS_EXPORTS_PATH="../.users-exports/users.json"
```

## Validation

A complement of _validation_ tasks can be run in the development environment or in production

- `npm run validate-users`
- `npm run validate-users-by-users-imports`
- `npm run validate-users-by-users-exports`
- `npm run validate-users-imports-by-users`
- `npm run validate-users-imports-by-users-exports`
- `npm run validate-users-exports-by-users`
- `npm run validate-users-exports-by-users-imports`

Any or all of these tasks can be run by building the image [using Dockerfile `validate.Dockerfile`](#starting-with-npm run-validate) and setting the environment variables [documented in **Validation**](validation.md)

[^1]: JS `Date` instances have values in _milliseconds_ so you can divide a JS date by 1000 for the same value in _seconds_

```javascript
(new Date('Tuesday, 18 April 2023')) / 1000
```
