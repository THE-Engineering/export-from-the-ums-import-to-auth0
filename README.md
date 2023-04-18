# export-from-the-ums-import-to-auth0

This application exports users from THE UMS and imports them to Auth0

It is organised into _scripts_ which perform a particular task, or a series of tasks

It can be built for Docker

## Set-up

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

## Starting with `npm start`

### In Development

[Exporting users](docs/exporting-users-from-the-ums.md) in your develoment environment requires [a secure tunnel to MariaDB in AWS](docs/opening-a-tunnel.md)

### In Development and Production

A `.env.default` file in the project root describes the _required_ environment variables from which you can create a `.env` file

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

## Docker

Docker must provide the container with _at minimum_ 4GB RAM

### Building the Docker image

```bash
docker build -t export-from-the-ums-import-to-auth0 .
```

### Starting the Docker container

```bash
docker compose up -d
```
