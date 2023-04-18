## 1 - Open a tunnel

You will need the _shared private key_ for the AWS bastion _from DevOps_

- Save it to a `pem` file `~/.ssh/bastion.pem`
- Ensure that it is readable only by your user

```bash
chmod 600 ~/.ssh/bastion.pem
```

You need values for these placeholders

- `LOCAL PORT`
- `REMOTE HOST`
- `REMOTE PORT`
- `BASTION USER`
- `BASTION HOST`

The `REMOTE HOST` and `REMOTE PORT` values are for the MariaDB instance _in AWS_

The `BASTION USER` and `BASTION HOST` are for an environment in _AWS_ which serves as a _proxy_ or _jump point_ to the MariaDB instance. (You create a secure connection from your local device to the remote bastion in AWS which is securely connected to MariaDB)

### `LOCAL PORT`

You can use any available port on your local device for the `LOCAL PORT`

### `REMOTE HOST`

The MariaDB host will _typically_ end with `rds.amazonaws.com` but _get from DevOps_

### `REMOTE PORT`

The MariaDB port is _typically_ `3306` but _confirm with DevOps_

### `BASTION USER` and `BASTION HOST`

_Get both from DevOps_

### Open a secure tunnel with `ssh`

Replace the placeholders (including the `"<` and `>"` parts) with the values, then at the command line execute:

```bash
ssh -i "~/.ssh/bastion.pem" -L "<LOCAL PORT>":"<REMOTE HOST>":"<REMOTE PORT>" "<BASTION USER>"@"<BASTION HOST>"
```

# 2 - MariaDB connection configuration

You need values for these placeholders

- `MARIADB USER`
- `MARIADB PASSWORD`
- `MARIADB HOST`
- `MARIADB PORT`
- `MARIADB DATABASE`

Get all of these values _from DevOps_ except `MARIADB HOST` and `MARIADB PORT`

- `MARIADB HOST` is `localhost`
- `MARIADB PORT` is `LOCAL PORT` from [the previous step](#1---open-a-tunnel)

Put theses keys and values into your `.env` file

```dotenv
MARIADB_USER="<MARIADB USER>"
MARIADB_PASSWORD="<MARIADB PASSWORD>"
MARIADB_HOST="<MARIADB HOST>"
MARIADB_PORT=<MARIADB PORT>
MARIADB_DATABASE="<MARIADB DATABASE>"
```

Or, you can provide them as command line arguments

```bash
npm run user -- \
  --MARIADB_USER "<MARIADB USER>" \
  --MARIADB_PASSWORD "<MARIADB PASSWORD>" \
  --MARIADB_HOST "<MARIADB HOST>" \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE "<MARIADB DATABASE>"
```
