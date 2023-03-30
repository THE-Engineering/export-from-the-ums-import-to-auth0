## Exporting users from THE UMS with `users`

Note that this script expects a file path _not_ a directory path

You should [login to Platform.sh at the command line and open a tunnel](logging-in-to-platformsh-and-opening-a-tunnel.md) to production or staging before proceeding

### Starting

You need

- The _MariaDB Password_

With NPM

```bash
npm run users -- \
  --MARIADB_USER '<MARIADB USER>' \
  --MARIADB_PASSWORD '<MARIADB PASSWORD>' \
  --MARIADB_HOST '<MARIADB HOST>' \
  --MARIADB_PORT '<MARIADB PORT>' \
  --MARIADB_DATABASE '<MARIADB DATABASE>' \
  --DESTINATION '<USERS_JSON_FILE>'
```

Otherwise

```bash
./script/users.mjs \
  --MARIADB_USER '<MARIADB USER>' \
  --MARIADB_PASSWORD '<MARIADB PASSWORD>' \
  --MARIADB_HOST '<MARIADB HOST>' \
  --MARIADB_PORT '<MARIADB PORT>' \
  --MARIADB_DATABASE '<MARIADB DATABASE>' \
  --DESTINATION '<USERS_JSON_FILE>'
```

Exported JSON is written to the file `./json/users.json`
