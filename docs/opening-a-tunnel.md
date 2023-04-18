## 1 - Open a tunnel

You will need the _shared private key_ for the bastion in AWS _from DevOps_

- Save it to a `pem` file `~/.ssh/bastion.pem`
- Ensure that it is readable only by your user

```bash
chmod 0600 ~/.ssh/bastion.pem
```

You will need

- The _Local Port_
- The _Remote Host_
- The _Remote Port_
- The _Bastion User_
- The _Bastion Host_

The _Remote Host_ and _Remote Port_ values are for the MariaDB instance _in AWS_

The _Bastion User_ and _Bastion Host_ are for an environment in _AWS_ which serves as a _proxy_ or _jump point_ to the MariaDB instance. (You create a secure connection from your local device to the remote bastion in AWS which is securely connected to MariaDB)

### _Local Port_

You can use any available port in your development environment for the _Local Port_

### _Remote Host_

The _Remote Host_ is _MariaDB Host_ in AWS and will _typically_ end with `rds.amazonaws.com` but _get the value from DevOps_

### _Remote Port_

The _Remote Port_ is the _MariaDB Port_ in AWS and is _typically_ `3306` but _get the value from DevOps_

### _Bastion User_ and _Bastion Host_

_Get both values from DevOps_

### Open a secure tunnel with `ssh`

```bash
LOCAL_PORT="<LOCAL PORT>"
REMOTE_HOST="<REMOTE HOST>"
REMOTE_PORT="<REMOTE PORT>"
BASTION_USER="<BASTION USER>"
BASTION_HOST="<BASTION HOST>"

ssh -i "~/.ssh/bastion.pem" -L $LOCAL_PORT:$REMOTE_HOST:$REMOTE_PORT $BASTION_USER@$BASTION_HOST
```

# 2 - MariaDB connection configuration

You will need

- The _MariaDB User_
- The _MariaDB Password_
- The _MariaDB Host_
- The _MariaDB Port_
- The _MariaDB Database_

Get all of these values _from DevOps_ except _MariaDB Host_ and _MariaDB Port_

- _MariaDB Host_ is `localhost`
- _MariaDB Port_ is the _Local Port_ from [the previous step](#1---open-a-tunnel)

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
