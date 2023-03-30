# Creating an API access token

You need

- Access to the User Management System project in [Platform.sh](https://platform.sh)

## Create an API access token

In the [Platform.sh console](https://console.platform.sh) select My Profile from the dropdown menu in the top right-hand corner

!["My Profile" in the dropdown menu](images/dropdown-menu.png)

Then click "API TOKENS" in the page header menu

!["API TOKENS" in the page header menu](images/header-menu.png)

Then click the "Create API Token" CTA on the right-hand side below the page header menu

![The "Create API Token" CTA](images/api-token.png)

Enter a descriptive name in the "Name" field, then click the "Create API Token" CTA below it

![API Tokens page](images/api-token.png)

Click the "Copy" CTA to copy the access token to your device's clipboard

![API Tokens page](images/api-token-successfully-created.png)

Paste the access token as the value of the `PLATFORMSH_CLI_TOKEN` environment variable in your `.env` file

```dotenv
PLATFORMSH_CLI_TOKEN=<ACCESS TOKEN>
```
