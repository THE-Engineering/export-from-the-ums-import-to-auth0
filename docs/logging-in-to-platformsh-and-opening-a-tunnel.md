# Logging in to Platform.sh and opening a tunnel

You need

- The [Platform.sh CLI installed on your device](https://docs.platform.sh/administration/cli.html)

## 1 - Login to Platform.sh

In a terminal, login to Platform.sh. This will open a browser window for you to enter your credentials

<img alt="Login" src="images/1-platform-login.png" width="525px" />

## 2 - Open an tunnel

Open a tunnel to the User Management System

<img alt="Select the User Management System" src="images/2-platform-tunnel-open.png" width="525px" />

Enter an environment ID (in this case `master`) then enter `y` to open the tunnel

<img alt="Enter `master` then `y`" src="images/3-master.png" width="525px" />

# 3 - MariaDB connection configuration

Note the connection configuration after `mysql://`

<img alt="Enter `master` then `y`" src="images/3-master.png" width="525px" />

- The _MariaDB User_ is `admin`
- The _MariaDB Password_ is (in this image) _redacted_
- The _MariaDB Host_ is `127.0.0.1`
- The _MariaDB Port_ is `30001`
- The _MariaDB Database_ is `main`

You should each of the values to your device's clipboard

Either paste them as the value to the corresponding key in your `.env` file

```dotenv
MARIADB_USER='<MARIADB USER>'
MARIADB_PASSWORD='<MARIADB PASSWORD>'
MARIADB_HOST='<MARIADB HOST>'
MARIADB_PORT=<MARIADB PORT>
MARIADB_DATABASE='<MARIADB DATABASE>'
```

Or as arguments on the command line

```bash
npm run user -- \
  --MARIADB_USER '<MARIADB USER>' \
  --MARIADB_PASSWORD '<MARIADB PASSWORD>' \
  --MARIADB_HOST '<MARIADB HOST>' \
  --MARIADB_PORT <MARIADB PORT> \
  --MARIADB_DATABASE '<MARIADB DATABASE>'
```
