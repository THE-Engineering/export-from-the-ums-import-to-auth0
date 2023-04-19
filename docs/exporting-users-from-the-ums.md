## Exporting users from THE UMS with `users`

Note that this script expects a file path _not_ a directory path

### `users`

You need

- The _MariaDB User_
- The _MariaDB Password_
- The _MariaDB Host_
- The _MariaDB Port_
- The _MariaDB Database_
- A _Destination_ file path

With NPM

```bash
npm run users -- \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>"
```

Otherwise

```bash
./script/users.mjs \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>"
```

Exported JSON is written to the _Destination_ file path
