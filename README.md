# export-from-the-ums-import-to-auth0

This application exports users from THE UMS in Platorm.sh and imports them to Auth0

It is organised into _scripts_ which perform a particular task, or a series of tasks

It can be built for Docker

## Platform.sh

_Export_ tasks require a machine-to-machine access token for [Platform.sh](https://console.platform.sh)

- [Exporting users from THE UMS](docs/exporting-users-from-the-ums.md)

## Auth0

_Import_ tasks require machine-to-machine credentials for [Auth0](https://manage.auth0.com)

- [Importing users to Auth0](docs/importing-users-to-auth0.md)

## Set-up

These documents assume that a developer is preparing their _development environment_ to perform tasks manually but the same configuration is required for _production_

- [Exporting users from THE UMS](docs/exporting-users-from-the-ums.md)
- [Transforming users to Auth0 JSON](docs/transforming-users-to-auth0-json.md)
- [Importing users to Auth0](docs/importing-users-to-auth0.md)
- [Exporting users from Auth0](docs/exporting-users-from-auth0.md)
- [Validation](docs/validation.md)

## Start

A `.env.default` file in the project root describes the _required_ environment variables from which you can create a `.env` file

To perform the complete series of tasks you can populate your `.env` file with the remaining environment variables

```bash
npm start
```

Or, you can invoke the same script target with command line arguments

```bash
npm start -- \
  --USERS_JSON_FILE '<USERS JSON FILE>' \
  --PLATFORM_PROJECT '<PLATFORM PROJECT>' \
  --PLATFORM_BRANCH '<PLATFORM BRANCH>' \
  --PLATFORMSH_CLI_TOKEN '<PLATFORMSH CLI TOKEN>' \
  --PLATFORMSH_CLI_NO_INTERACTION '<PLATFORMSH CLI NO INTERACTION>' \
  --MARIADB_USER '<MARIADB USER>' \
  --MARIADB_PASSWORD '<MARIADB PASSWORD>' \
  --MARIADB_HOST '<MARIADB HOST>' \
  --MARIADB_PORT '<MARIADB PORT>' \
  --MARIADB_DATABASE '<MARIADB DATABASE>' \
  --AUTH0_JSON_DIRECTORY '<AUTH0 JSON DIRECTORY>' \
  --AUTH0_DOMAIN '<AUTH0 DOMAIN>' \
  --AUTH0_CONNECTION_ID '<AUTH0 CONNECTION ID>' \
  --AUTH0_CLIENT_ID '<AUTH0 CLIENT ID>' \
  --AUTH0_CLIENT_SECRET '<AUTH0 CLIENT SECRET>' \
  --AUTH0_AUDIENCE '<AUTH0 AUDIENCE>' \
  --AUTH0_RESOURCE '<AUTH0 RESOURCE>' \
  --AUTH0_UPSERT '<AUTH0 UPSERT>' \
  --STATUS_JSON_DIRECTORY '<STATUS JSON DIRECTORY>' \
  --USERS '<USERS>' \
  --USERS_BY_USERS_IMPORTS '<USERS BY USERS IMPORTS>' \
  --USERS_BY_USERS_EXPORTS '<USERS BY USERS EXPORTS>' \
  --USERS_IMPORTS_BY_USERS_EXPORTS '<USERS IMPORTS BY USERS EXPORTS>' \
  --USERS_EXPORTS_BY_USERS_IMPORTS '<USERS EXPORTS BY USERS IMPORTS>' \
  --USERS_IMPORTS_BY_USERS '<USERS IMPORTS BY USERS>' \
  --USERS_EXPORTS_BY_USERS '<USERS EXPORTS BY USERS>'
```

You can _combine_ environment variables with command line arguments, in which case the latter take precedence over the former

## Building the Docker image

```bash
docker build -t export-from-the-ums-import-to-auth0 .
```

## Starting the Docker container

```bash
docker compose up -d
```
