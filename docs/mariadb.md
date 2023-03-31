# MariaDB

To connect to the UMS MariaDB instance you must have [open a secure tunnel using Platform.sh](./logging-in-to-platformsh-and-opening-a-tunnel.md) to the appropriate environment

## MariaDB connection configuration

You can provide the MariaDB connection configuration either as a _JSON file_

```bash
--MARIADB_FILE ./connection.json
```

As environment variables

```dotenv
MARIADB_USER='<MARIADB USER>' \
MARIADB_PASSWORD='<MARIADB PASSWORD>' \
MARIADB_HOST='<MARIADB HOST>' \
MARIADB_PORT=<MARIADB PORT> \
MARIADB_DATABASE='<MARIADB DATABASE>'
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
