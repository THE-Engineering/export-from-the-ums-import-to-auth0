# Transforming users from THE UMS JSON to Auth0 JSON with `transform-users`

Note that this script expects a file path for the _origin_ and a directory path for the _destination_

With NPM

```bash
npm run transform-users -- \
  --ORIGIN "<USERS JSON FILE>" \
  --DESTINATION "<AUTH0 JSON FILE>"
```

Otherwise

```bash
node ./scripts/transform-users.mjs \
  --ORIGIN "<USERS JSON FILE>" \
  --DESTINATION "<AUTH0 JSON FILE>"
```
