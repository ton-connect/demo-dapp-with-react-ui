import './App.scss';
import './trackers';
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Footer} from "./components/Footer/Footer";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{theme: THEME.DARK}}
      walletsListConfiguration={{
        includeWallets: [
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
          },
          {
            appName: "tokenpocket",
            name: "TokenPocket",
            imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
            aboutUrl: "https://tokenpocket.pro",
            jsBridgeKey: "tokenpocket",
            platforms: ["ios", "android"]
          },
          {
            appName: "dewallet",
            name: "DeWallet",
            imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
            aboutUrl: "https://delabwallet.com",
            universalLink: "https://t.me/dewallet?attach=wallet",
            bridgeUrl: "https://bridge.dewallet.pro/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"]
          },
          {
            appName: "BitgetWeb3",
            name: "BitgetWeb3",
            imageUrl: "https://img.bitgetimg.com/image/third/1723701408284.png",
            aboutUrl: "https://www.bitget.com",
            universalLink: "https://t.me/BitgetOfficialBot?attach=wallet",
            bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
            platforms: ["ios", "android", "windows", "macos", "linux"]
          },
          {
            appName: "cdcTonWallet",
            name: "Crypto.com DeFi Wallet",
            imageUrl: "https://apro-ncw-api-file.crypto.com/wallet/logo",
            aboutUrl: "https://crypto.com/defi-wallet",
            universalLink: "https://wallet.crypto.com/deeplink/ton-connect",
            deepLink: "dfw://",
            jsBridgeKey: "cdcTonWallet",
            bridgeUrl: "https://wallet.crypto.com/sse/tonbridge",
            platforms: ["ios", "android", "chrome"]
          },
          {
            appName: "tobi",
            name: "Tobi",
            imageUrl: "https://app.tobiwallet.app/icons/logo.png",
            aboutUrl: "https://tobi.fun",
            universalLink: "https://t.me/TobiWalletBot?attach=wallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"]
          },
          {
            appName: "trustwalletTon",
            name: "Trust",
            imageUrl: "https://assets-cdn.trustwallet.com/dapps/trust.logo.png",
            aboutUrl: "https://trustwallet.com/about-us",
            bridgeUrl: "https://tonconnect.trustwallet.com/bridge",
            jsBridgeKey: "trustwalletTon",
            platforms: ["chrome", "ios", "android"]
          },
          {
            appName: "bitgetWalletLite",
            name: "Bitget Wallet Lite",
            imageUrl: "https://raw.githubusercontent.com/bitgetwallet/download/main/logo/png/bitget_wallet_lite_logo.png",
            aboutUrl: "https://web3.bitget.com",
            universalLink: "https://t.me/BitgetWallet_TGBot?attach=wallet",
            bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
            platforms: ["ios", "android", "macos", "windows", "linux"]
          },
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/tc_twa_demo_bot/start'
      }}
    >
      <div className="app">
        <Header/>
        <TxForm/>
        {/*<TonProofDemo />*/}
        <Footer/>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
