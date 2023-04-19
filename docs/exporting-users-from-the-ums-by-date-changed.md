## Exporting users from THE UMS with `users-by-date-changed`

Note that this script expects a file path _not_ a directory path

### `users-by-date-changed`

You need

- The _MariaDB User_
- The _MariaDB Password_
- The _MariaDB Host_
- The _MariaDB Port_
- The _MariaDB Database_
- A _Destination_ file path
- A _Date Changed_ expressed in [Unix time](https://www.unixtimestamp.com/)

With NPM

```bash
npm run users-by-date-changed -- \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>" \
  --DATE_CHANGED <DATE CHANGED>
```

Otherwise

```bash
./script/users-by-date-changed.mjs \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>" \
  --DATE_CHANGED <DATE CHANGED>
```

Exported JSON is written to the _Destination_ file path
