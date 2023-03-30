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

Note the credentials after `mysql://` - The username is `admin` and the password is (in this image) _redacted_. You should copy the password to your device's clipboard

Either paste it as value to the corresponding key in your `.env` file

```dotenv
MARIADB_PASSWORD=<MARIADB PASSWORD>
```

Or as an argument on the command line

```bash
npm run user -- --MARIADB_PASSWORD '<MARIADB PASSWORD>'
```
