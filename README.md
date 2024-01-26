# Demo dApp with @tonconnect/ui-react

This Demo dApp showcases the integration with @tonconnect/ui-react. Experience it live at [Demo dApp with Wallet](https://ton-connect.github.io/demo-dapp-with-wallet/).

## Learn More About Ton Connect

To understand more about Ton Connect and how it enables blockchain functionalities in your applications, refer to the following resources:
- Ton Connect Documentation: [https://docs.ton.org/develop/dapps/ton-connect/](https://docs.ton.org/develop/dapps/ton-connect/)
- Ton Connect SDK and UI Library on GitHub: [https://github.com/ton-connect/sdk/tree/main/packages/ui](https://github.com/ton-connect/sdk/tree/main/packages/ui)

## Installation

### Project Dependencies

Install the necessary packages for this project:

```bash
npm install
```

### ngrok or localtunnel (Optional)

Choose either ngrok or localtunnel to expose your local server to the internet for testing in Telegram.

#### ngrok Installation

```bash
npm install -g ngrok
```

ngrok Documentation: [https://ngrok.com/docs](https://ngrok.com/docs)

#### localtunnel Installation

```bash
npm install -g localtunnel
```

LocalTunnel Documentation: [https://localtunnel.github.io/www/](https://localtunnel.github.io/www/)

### Creating Telegram Mini Apps (Optional)

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the `/newbot` command to create a new bot.
3. Follow the prompts to set up your bot, providing all necessary information.
4. After the bot is created, send the `/newapp` command to BotFather.
5. Select your bot from the list.
6. Provide all the required information for your Mini App.


### Returning to the Application (Optional)

To return to the application after interacting with the wallet, you must specify a `twaReturnUrl` in `src/App.tsx`.

Here's a concise guide:

- **twaReturnUrl**: This is the return URL used by Telegram Web Apps. Set it to redirect users back to your application after wallet interaction. Example: `'https://t.me/WebAppWalletBot/myapp'`.

Here is a sample configuration for specifying a return URL:

```jsx
<TonConnectUIProvider
    manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
    uiPreferences={{ theme: THEME.DARK }}
    actionsConfiguration={{
        twaReturnUrl: 'https://t.me/WebAppWalletBot/myapp'
    }}
></TonConnectUIProvider>
```

### Adding a Custom Wallet (Optional)

To integrate a custom wallet into your application, adjust the `walletsListConfiguration` in `src/App.tsx`. Include your wallet details in `includeWallets` and specify `universalLink`. 

Here's a concise guide:

- **universalLink**: This URL is used to open the wallet directly from a web link. It should link to your wallet's bot or app. Example: `'https://t.me/wallet/start'`.

Here is a sample configuration for adding a custom wallet:

```jsx
<TonConnectUIProvider
    manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
    uiPreferences={{ theme: THEME.DARK }}
    walletsListConfiguration={{
        includeWallets: [
            {
                appName: "telegram-wallet",
                name: "Wallet",
                imageUrl: "https://wallet.tg/images/logo-288.png",
                aboutUrl: "https://wallet.tg/",
                universalLink: "https://t.me/wallet/start",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
            }
        ]
    }}
    actionsConfiguration={{
        twaReturnUrl: 'https://t.me/WebAppWalletBot/myapp'
    }}
></TonConnectUIProvider>
```

## Running the Application

### Starting the Application

To start the application, run:

```bash
npm dev
```

The application will be accessible at [http://localhost:5173](http://localhost:5173).

### Exposing Your Local Server (Optional)

#### Using ngrok

```bash
ngrok http 5173
```

#### Using localtunnel

```bash
lt --port 5173
```

After setting up ngrok or localtunnel, update your Telegram bot's configuration with the provided URL to ensure the bot points to your local development environment.

### Updating Telegram Bot Configuration (Optional)

#### Update the Menu Button URL in Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the `/mybots` command and select your bot.
3. Choose "Bot Settings" then "Menu Button" and finally "Configure menu button".
4. Enter the ngrok or localtunnel URL as the new destination.

#### Update Mini Apps URL in Telegram

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the `/myapps` command and select your Mini App.
3. Choose "Edit Web App URL".
4. Enter the ngrok or localtunnel URL as the new destination.
