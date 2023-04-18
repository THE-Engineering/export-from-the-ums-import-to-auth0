## Exporting users from Auth0 with `users-exports`

Note that this script expects a directory path _not_ a file path

You should create _either_ a manual or a programmatic acccess token before proceeding

- About [Auth0 manual and programmatic access tokens](./auth0-manual-and-programmatic-access-tokens.md)
- [Creating a programmatic access token](./creating-a-programmatic-access-token.md)

### Starting with a manual token

You need

- The _Domain_ of your Auth0 account
- The _Connection ID_ of the database into which users will be imported
- A manual _Access Token_

With NPM

```bash
npm run users-exports -- \
  --AUTH0_DOMAIN "<AUTH0 DOMAIN>" \
  --AUTH0_CONNECTION_ID "<AUTH0 CONNECTION ID>" \
  --AUTH0_ACCESS_TOKEN "<AUTH0 ACCESS TOKEN>" \
  --DESTINATION "<STATUS JSON DIRECTORY>"
```

Otherwise

```bash
./script/users-exports.mjs \
  --AUTH0_DOMAIN "<AUTH0 DOMAIN>" \
  --AUTH0_CONNECTION_ID "<AUTH0 CONNECTION ID>" \
  --AUTH0_ACCESS_TOKEN "<AUTH0 ACCESS TOKEN>" \
  --DESTINATION "<STATUS JSON DIRECTORY>"
```

Exported JSON is written to the file `.users-exports/users.json`

### Starting with a programmatic token

You need

- The _Domain_ of your Auth0 account
- The _Connection ID_ of the database into which users will be imported
- The _Client ID_ of your machine to machine application
- Its _Client Secret_
- The _Audience_, which is the API identifier
- The _URL_ of the Management API exposed on your _Domain_

With NPM

```bash
npm run users-exports -- \
  --AUTH0_DOMAIN "<AUTH0 DOMAIN>" \
  --AUTH0_CONNECTION_ID "<AUTH0 CONNECTION ID>" \
  --AUTH0_CLIENT_ID "<AUTH0 CLIENT ID>" \
  --AUTH0_CLIENT_SECRET "<AUTH0 CLIENT SECRET>" \
  --AUTH0_AUDIENCE "<AUTH0 AUDIENCE>" \
  --AUTH0_ACCESS_TOKEN_ENDPOINT "<AUTH0 RESOURCE>" \
  --DESTINATION "<STATUS JSON DIRECTORY>"
```

Otherwise

```bash
node ./scripts/users-exports.mjs \
  --AUTH0_DOMAIN "<AUTH0 DOMAIN>" \
  --AUTH0_CONNECTION_ID "<AUTH0 CONNECTION ID>" \
  --AUTH0_CLIENT_ID "<AUTH0 CLIENT ID>" \
  --AUTH0_CLIENT_SECRET "<AUTH0 CLIENT SECRET>" \
  --AUTH0_AUDIENCE "<AUTH0 AUDIENCE>" \
  --AUTH0_ACCESS_TOKEN_ENDPOINT "<AUTH0 RESOURCE>" \
  --DESTINATION "<STATUS JSON DIRECTORY>"
```

Exported JSON is written to the file `.users-exports/users.json`
