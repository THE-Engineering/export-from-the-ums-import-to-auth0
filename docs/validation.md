
# Validation

Validation produces a set of JSON files. All except one of those files is a _diff_ between other JSON files

_All data managed by this application_ is encrypted and must be decrypted for use

You can decrypt JSON files at the command line in your development environment using [@sequencemedia/crypto](https://github.com/sequencemedia/crypto)[^1]

## Parameters

- _Users_ `1` validates fields and values in THE UMS users source
- _Users by users imports_ `2` is a diff of THE UMS users and the users dispatched to Auth0
- _Users by users exports_ `3` is a diff of THE UMS users and the users retrieved from Auth0
- _Users imports by users exports_ `4` is a diff of the users dispatched to Auth0 and users retrieved from Auth0
- _Users exports by users imports_ `5` is a diff of the users retrieved from Auth0 and users dispatched to Auth0
- _Users imports by users_ `6` is a diff of the users dispatched to Auth0 and THE UMS users
- _Users exports by users_ `7` is a diff of the users retrieved from Auth0 and THE UMS users

`1` produces `.validate/users.json`

`2` produces `.validate/users-by-users-imports.json`

`3` produces `.validate/users-by-users-exports.json`

`4` produces `.validate/users-imports-by-users-exports.json`

`5` produces `.validate/users-exports-by-users-imports.json`

`6` produces `.validate/users-imports-by-users.json`

`7` produces `.validate/users-exports-by-users.json`

You _may_ want `1`

- `1` describes users likely to be rejected by Auth0

You _definitely_ want `3` and `7`

- `3` describes users originating from THE UMS but who are _not in_ Auth0
- `7` describes users who are _in_ Auth0 but who did not originate from THE UMS

To generate any of the JSON files you should set the corresponding numeric option when invoking validation at the command line

## With NPM

Assuming options `1`, `3`, and `7`, either

```bash
npm run validate -- -137
```

Or

```bash
npm run validate -- -1 -3 -7
```

## Otherwise

Similarly, assuming options `1`, `3`, and `7`, either

```bash
./validate.sh -137
```

Or

```bash
./validate.sh -1 -3 -7
```

## With `.env`

Alternatively, you can set `.env` environment variables before invoking validation at the command line

```dotenv
USERS=true # (1)
USERS_BY_USERS_IMPORTS=false # (2)
USERS_BY_USERS_EXPORTS=true # (3)
USERS_IMPORTS_BY_USERS_EXPORTS=false # (4)
USERS_EXPORTS_BY_USERS_IMPORTS=false # (5)
USERS_IMPORTS_BY_USERS=false # (6)
USERS_EXPORTS_BY_USERS=true # (7)
```

[^1]: Refer to [Bash scripts](https://github.com/sequencemedia/crypto#bash-scripts) in the `README` of the GitHub project
