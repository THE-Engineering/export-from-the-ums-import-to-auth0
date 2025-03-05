## Exporting users from THE UMS with `user-by-uid`

Note that this script expects a file path _not_ a directory path

### `user-by-uid`

You need

- The _MariaDB User_
- The _MariaDB Password_
- The _MariaDB Host_
- The _MariaDB Port_
- The _MariaDB Database_
- A _Destination_ file path
- A Drupal _DRUPAL_UID_

With NPM

```bash
npm run user-by-uid -- \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>" \
  --DRUPAL_UID "<DRUPAL UID>"
```

Otherwise

```bash
./scripts/user-by-uid.mjs \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>" \
  --DESTINATION "<USERS JSON FILE>" \
  --DRUPAL_UID <DRUPAL_UID>
```

Exported JSON is written to the _Destination_ file path
