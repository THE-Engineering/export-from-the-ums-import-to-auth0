# MariaDB

To connect to the UMS MariaDB instance you will need either to be running the database on localhost, or to open a secure tunnel using _Platform.sh_ to the appropriate environment

## MariaDB connection configuration

You can pass the configuration either as a _JSON file_

```bash
--MARIADB_FILE ./connection.json
```

Or as arguments on the command line

```bash
--MARIADB_USER '<MARIADB USER>' \
--MARIADB_PASSWORD '<MARIADB PASSWORD>' \
--MARIADB_HOST '<MARIADB HOST>' \
--MARIADB_PORT <MARIADB PORT> \
--MARIADB_DATABASE '<MARIADB DATABASE>'
```

A file named `connection.json` or `connection.<ENVIRONMENT>.json` can be put in the root directory of this project. (It will be ignored by Git)

## `users`

Invoking `users` exports users from MariaDB to the local file system in JSON format

```bash
npm run users
```
