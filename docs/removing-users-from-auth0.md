## Removing users from Auth0

Note that these scripts expect a file path _not_ a directory path

### With `remove-by-users`

#### Step 1 - Generate a users JSON file

Generate a users JSON file with `users`

With NPM

```bash
npm run users -- \
  --DESTINATION "<USERS JSON FILE>"
```

```bash
./script/users.mjs -- \
  --DESTINATION "<USERS JSON FILE>"
```

Exported JSON is written to the _Destination_ file path

#### Step 2 - Remove users

With NPM

```bash
npm run remove-by-users -- \
  --ORIGIN "<USERS JSON FILE>"
```

Otherwise

```bash
./script/remove-by-users.mjs \
  --ORIGIN "<USERS JSON FILE>"
```

### With `remove-by-users-exports`

#### Step 1 - Generate a users exports JSON file

Generate a users exports JSON file with `users-exports`

With NPM

```bash
npm run users-exports -- \
  --USERS_EXPORTS_PATH "<USERS EXPORTS JSON FILE>"
```

```bash
./script/users-exports.mjs -- \
  --USERS_EXPORTS_PATH "<USERS EXPORTS JSON FILE>"
```

Exported JSON is written to the _Users Exports_ file path

#### Step 2 - Remove users

With NPM

```bash
npm run remove-by-users-exports -- \
  --USERS_EXPORTS_PATH "<USERS EXPORTS JSON FILE>"
```

Otherwise

```bash
./script/remove-by-users-exports.mjs \
  --USERS_EXPORTS_PATH "<USERS EXPORTS JSON FILE>"
```

### With `remove-by-users-imports`

#### Step 1 - Generate a users imports JSON file

Generate a users imports JSON file with `users-imports`

With NPM

```bash
npm run users-imports -- \
  --USERS_IMPORTS_PATH "<USERS IMPORTS JSON FILE>"
```

```bash
./script/users-imports.mjs -- \
  --USERS_IMPORTS_PATH "<USERS IMPORTS JSON FILE>"
```

Exported JSON is written to the _Users Imports_ file path

#### Step 2 - Remove users

With NPM

```bash
npm run remove-by-users-imports -- \
  --USERS_IMPORTS_PATH "<USERS IMPORTS JSON FILE>"
```

Otherwise

```bash
./script/remove-by-users-imports.mjs \
  --USERS_IMPORTS_PATH "<USERS IMPORTS JSON FILE>"
```
