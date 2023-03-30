# Transforming users to Auth0 JSON with `transform`

Note that this script expects a file path for the _origin_ and a directory path for the _destination_

With NPM

```bash
npm run transform -- \
  --ORIGIN '<JSON PATH>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```

Otherwise

```bash
node ./scripts/transform.mjs \
  --ORIGIN '<JSON PATH>' \
  --DESTINATION '<AUTH0 JSON DIRECTORY>'
```
