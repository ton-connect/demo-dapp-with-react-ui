import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";
import {CreateJettonDemo} from "./components/CreateJettonDemo/CreateJettonDemo";

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          walletsListConfiguration={{
            includeWallets: [
              {
                appName: "safepalwallet",
                name: "SafePal",
                imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
                tondns: "",
                aboutUrl: "https://www.safepal.com",
                universalLink: "https://link.safepal.io/ton-connect",
                deepLink: "safepal-tc://",
                jsBridgeKey: "safepalwallet",
                bridgeUrl: "https://ton-bridge.safepal.com/tonbridge/v1/bridge",
                platforms: ["ios", "android", "chrome", "firefox"]
              },
              {
                appName: "bitgetTonWallet",
                name: "Bitget Wallet",
                imageUrl: "https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget%20wallet_logo_iOS.png",
                aboutUrl: "https://web3.bitget.com",
                deepLink: "bitkeep://",
                jsBridgeKey: "bitgetTonWallet",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["ios", "android", "chrome"],
                universalLink: "https://bkcode.vip/ton-connect"
              },
              {
                appName: "tonwallet",
                name: "TON Wallet",
                imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                universalLink: "https://wallet.ton.org/ton-connect",
                jsBridgeKey: "tonwallet",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["chrome", "android"]
              },
              {
                appName: "nicegramWallet",
                name: "Nicegram Wallet",
                imageUrl: "https://static.nicegram.app/icon.png",
                aboutUrl: "https://nicegram.app",
                universalLink: "https://nicegram.app/tc",
                deepLink: "nicegram-tc://",
                jsBridgeKey: "nicegramWallet",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["ios", "android"]
              }
            ]
          }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo'
          }}
      >
        <div className="app">
            <Header />
            <TxForm />
            <CreateJettonDemo />
            <TonProofDemo />
            <Footer />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
