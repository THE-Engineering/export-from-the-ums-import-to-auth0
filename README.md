# export-from-the-ums-import-to-auth0

This application exports users from THE UMS and imports them to Auth0

It is organised into _scripts_ which perform a particular task, or a series of tasks

It can be built for Docker

## Set-up

### Shared secret

`CRYPTO_KEY` is a shared secret which is used to encrypt and decrypt data

You should provide `CRYPTO_KEY` as an _environment variable_ (ensuring it is not read from or written to disk, logged, or printed in the terminal)

_All data managed by this application_ is encrypted using a shared secret and it can only be decrypted with the same shared secret

### AWS

You will need credentials for MariaDB in AWS which you can _get from DevOps_

In **Development** you must [open a secure tunnel to MariaDB using the bastion in AWS](docs/opening-a-tunnel.md)

A secure tunnel is unecessary in **Production**

### Auth0

You should create _either_ a manual or a programmatic acccess token for [Auth0](https://manage.auth0.com)

- About [Auth0 manual and programmatic access tokens](docs/auth0-manual-and-programmatic-access-tokens.md)
- [Creating a programmatic access token](docs/creating-a-programmatic-access-token.md)

### Scripts

These documents assume that a developer is preparing their _development environment_ to perform tasks manually but much of the same configuration is required for _production_

- [Exporting users from THE UMS](docs/exporting-users-from-the-ums.md)
- [Transforming users to Auth0 JSON](docs/transforming-users-from-the-ums-json-to-auth0-json.md)
- [Importing users to Auth0](docs/importing-users-to-auth0.md)
- [Exporting users from Auth0](docs/exporting-users-from-auth0.md)
- [Validation](docs/validation.md)

#### Other scripts

- [Exporting users from THE UMS _by date changed_](docs/exporting-users-from-the-ums-by-date-changed.md)
- [Exporting users from THE UMS _by date created_](docs/exporting-users-from-the-ums-by-date-created.md)
- [Removing users from Auth0](docs/removing-users-from-auth0.md)

## Starting with `npm start`

Regardless of the environment _all data managed by this application_ is encrypted and must be decrypted for use

You can populate your `.env` file with the `CRYPTO_KEY` environment variable [documented in **Shared secret**](#shared-secret)

### In Development

[Exporting users from THE UMS](docs/exporting-users-from-the-ums.md) in your _development environment_ requires [a secure tunnel to MariaDB in AWS](docs/opening-a-tunnel.md)

### In Development and Production

[Exporting users from THE UMS](docs/exporting-users-from-the-ums.md) in _production_ does not require a secure tunnel

### Environment variables and command line arguments

The `.env.default` file describes _required_ environment variables from which you can create a `.env` file

You must populate your `.env` file with the environment variables [documented in **Scripts**](#scripts)

```bash
npm start
```

Or, you can invoke the same script target with command line arguments

```bash
npm start -- \
  --USERS_JSON_FILE "<USERS JSON FILE>" \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT "<MARIADB PORT>" \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --AUTH0_JSON_FILE "<AUTH0 JSON FILE>" \
  --AUTH0_DOMAIN "<AUTH0 DOMAIN>" \
  --AUTH0_CONNECTION_ID "<AUTH0 CONNECTION ID>" \
  --AUTH0_CLIENT_ID "<AUTH0 CLIENT ID>" \
  --AUTH0_CLIENT_SECRET "<AUTH0 CLIENT SECRET>" \
  --AUTH0_AUDIENCE "<AUTH0 AUDIENCE>" \
  --AUTH0_ACCESS_TOKEN_ENDPOINT "<AUTH0 RESOURCE>" \
  --AUTH0_UPSERT "<AUTH0 UPSERT>" \
  --STATUS_JSON_DIRECTORY "<STATUS JSON DIRECTORY>" \
  --USERS "<USERS>" \
  --USERS_BY_USERS_IMPORTS "<USERS BY USERS IMPORTS>" \
  --USERS_BY_USERS_EXPORTS "<USERS BY USERS EXPORTS>" \
  --USERS_IMPORTS_BY_USERS_EXPORTS "<USERS IMPORTS BY USERS EXPORTS>" \
  --USERS_EXPORTS_BY_USERS_IMPORTS "<USERS EXPORTS BY USERS IMPORTS>" \
  --USERS_IMPORTS_BY_USERS "<USERS IMPORTS BY USERS>" \
  --USERS_EXPORTS_BY_USERS "<USERS EXPORTS BY USERS>"
```

You can _combine_ environment variables with command line arguments (in which case the latter take precedence over the former)

You can provide `CRYPTO_KEY` as _either_ an environment variable _or_ a command line argument but you should be mindful of _logging and echoing_

## Docker

Docker must provide the container with _at minimum_ 4GB RAM

### Building the Docker image

```bash
docker build -t export-from-the-ums-import-to-auth0 .
```

#### Building the _by date_ Docker image

Exports users from THE UMS by date _changed_ or _created_ since a _date_ expressed in [Unix time](https://www.unixtimestamp.com/) and imports them to Auth0

```bash
docker build -f by-date.Dockerfile -t export-from-the-ums-import-to-auth0 .
```

#### Building the _by date changed_ Docker image

Exports users from THE UMS by date _changed_ since a _date_ expressed in [Unix time](https://www.unixtimestamp.com/) and imports them to Auth0

```bash
docker build -f by-date-changed.Dockerfile -t export-from-the-ums-import-to-auth0 .
```

#### Building the _by date created_ Docker image

Exports users from THE UMS by date _created_ since a _date_ expressed in [Unix time](https://www.unixtimestamp.com/) and imports them to Auth0

```bash
docker build -f by-date-created.Dockerfile -t export-from-the-ums-import-to-auth0 .
```

### Starting the Docker container

```bash
docker compose up -d
```
