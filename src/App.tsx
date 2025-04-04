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
                appName: "telegram-wallet",
                name: "Wallet",
                imageUrl: "https://wallet.tg/images/logo-288.png",
                aboutUrl: "https://wallet.tg/",
                universalLink: "https://t.me/wallet?attach=wallet",
                bridgeUrl: "https://bridge.ton.space/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
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
                bridgeUrl: "https://tc.nicegram.app/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "tokenpocket",
                name: "TokenPocket",
                imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
                aboutUrl: "https://www.tokenpocket.pro",
                universalLink: "https://tp-lab.tptool.pro/ton-connect/",
                jsBridgeKey: "tokenpocket",
                bridgeUrl: "https://ton-connect.mytokenpocket.vip/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
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
                universalLink: "https://t.me/TobiCopilotBot?attach=wallet",
                bridgeUrl: "https://ton-bridge.tobiwallet.app/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "trustwalletTon",
                name: "Trust",
                imageUrl: "https://assets-cdn.trustwallet.com/dapps/trust.logo.png",
                aboutUrl: "https://trustwallet.com/about-us",
                bridgeUrl: "https://tonconnect.trustwallet.com/bridge",
                universalLink: "https://link.trustwallet.com/tc",
                deepLink: "trust://ton-connect",
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
              {
                appName: "onekey",
                name: "OneKey",
                imageUrl: "https://common.onekey-asset.com/logo/onekey-x288.png",
                aboutUrl: "https://onekey.so",
                jsBridgeKey: "onekeyTonWallet",
                platforms: ["chrome"]
              },
              {
                appName: "tomoWallet",
                name: "Tomo Wallet",
                imageUrl: "https://pub.tomo.inc/logo.png",
                aboutUrl: "https://www.tomo.inc/",
                universalLink: "https://t.me/tomowalletbot?attach=wallet",
                bridgeUrl: "https://go-bridge.tomo.inc/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "hpyTonWallet",
                name: "HyperPay Wallet",
                imageUrl: "https://onchain-oss.hyperpay.online/images/logo.png",
                aboutUrl: "https://www.hyperpay.tech",
                universalLink: "https://www.hyperpay.tech/download&deeplink=hyperpay://web3/wallet/tonconnect",
                jsBridgeKey: "hpyTonWallet",
                bridgeUrl: "https://onchain-wallet.hyperpay.online/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "unstoppable",
                name: "Unstoppable Wallet",
                imageUrl: "https://unstoppable.money/logo288.png",
                aboutUrl: "https://unstoppable.money/",
                universalLink: "https://unstoppable.money/ton-connect",
                bridgeUrl: "https://bridge.unstoppable.money/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "foxwallet",
                name: "FoxWallet",
                imageUrl: "https://hc.foxwallet.com/img/logo.png",
                aboutUrl: "https://foxwallet.com/",
                universalLink: "https://link.foxwallet.com/tc",
                jsBridgeKey: "foxwallet",
                bridgeUrl: "https://connect.foxwallet.com/ton/bridge",
                platforms: ["ios", "android", 'macos', 'windows', 'linux']
              },
              {
                appName: "jambo",
                name: "Jambo",
                imageUrl: "https://cdn-prod.jambotechnology.xyz/content/jambo_288x288_02da416a6c.png",
                aboutUrl: "https://www.jambo.technology/",
                deepLink: "jambotc://",
                universalLink: "https://jambophone.xyz/",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                jsBridgeKey: "jambowallet",
                platforms: ['android', 'macos', 'windows', 'linux']
              },
              {
                appName: "Gate.io wallet",
                name: "Gate.io wallet",
                imageUrl: "https://gimg2.gateimg.com/tgwallet/1730688473495507406-Gatewallet.png",
                aboutUrl: "https://www.gate.io",
                universalLink: "https://t.me/gateio_wallet_bot?attach=wallet",
                bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
                platforms: ["ios", "android", "linux", "windows", "macos"]
              },
              {
                appName: "coin98",
                name: "Coin98 ",
                imageUrl: "https://coin98.s3.ap-southeast-1.amazonaws.com/SocialLogo/ninetyeight.png",
                aboutUrl: "https://docs.coin98.com",
                deepLink: "coin98://ton-connect",
                bridgeUrl: "https://ton-bridge.coin98.tech/bridge",
                platforms: ["ios", "android"],
                universalLink: "https://coin98.com/ton-connect"
              },
              {
                appName: "coin98TelegramWallet",
                name: "Coin98 Telegram Wallet",
                imageUrl: "https://coin98.s3.ap-southeast-1.amazonaws.com/SocialLogo/ninetyeight.png",
                aboutUrl: "https://docs.coin98.com",
                universalLink: "https://t.me/Coin98_bot?attach=wallet",
                bridgeUrl: "https://ton-bridge.coin98.tech/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "miraiapp-tg",
                name: "Mirai Mini App",
                imageUrl: "https://cdn.mirailabs.co/miraihub/miraiapp-tg-icon-288.png",
                aboutUrl: "https://mirai.app",
                universalLink: "https://t.me/MiraiAppBot?attach=wallet",
                bridgeUrl: "https://bridge.mirai.app",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "miraiapp",
                name: "Mirai App",
                imageUrl: "https://cdn.mirailabs.co/miraihub/miraiapp-icon-288.png",
                aboutUrl: "https://mirai.app",
                universalLink: "https://go.miraiapp.io/ton-connect",
                deepLink: "miraiapp://",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                jsBridgeKey: "miraiapp",
                platforms: ["ios", "android", "chrome", "firefox"]
              },
              {
                appName: 'nestwallet',
                name: 'Nest Wallet',
                imageUrl: 'https://storage.googleapis.com/nestwallet-public-resource-bucket/logo/nest_logo_square.png',
                aboutUrl: 'https://www.nestwallet.xyz',
                jsBridgeKey: 'nestwallet',
                platforms: ['chrome']
              },
              {
                appName: "Architec.ton",
                name: "Architec.ton",
                imageUrl: "https://raw.githubusercontent.com/Architec-Ton/wallet-tma/refs/heads/dev/public/images/arcwallet_logo.png",
                aboutUrl: "https://architecton.tech",
                universalLink: "https://t.me/architec_ton_bot?attach=wallet",
                bridgeUrl: "https://tc.architecton.su/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "uxuyWallet",
                name: "UXUY Wallet",
                imageUrl: "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
                aboutUrl: "https://docs.uxuy.com",
                universalLink: "https://t.me/UXUYbot?attach=wallet",
                bridgeUrl: "https://bridge.uxuy.me/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "tonflow",
                name: "TONFLOW",
                imageUrl: "https://tonflow.app/assets/images/tonflow_ico_256.png",
                aboutUrl: "https://tonflow.app",
                universalLink: "https://tonflow.app/ton-connect",
                deepLink: "tonflow-tc://",
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                jsBridgeKey: "tonflow",
                platforms: ["windows", "linux", "macos", "chrome"]
              },
              {
                appName: 'Tonkeeper',
                name: 'TonkeeperWeb',
                imageUrl: 'https://raw.githubusercontent.com/tonkeeper/tonkeeper-web/0f197474c57937787608697e794ef2b20a62f0d4/apps/twa/public/logo-128x128.png',
                aboutUrl: 'https://wallet.tonkeeper.com/',
                universalLink: 'https://wallet.tonkeeper.com/ton-connect',
                bridgeUrl: "https://bridge.tonapi.io/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "hot",
                name: "HOT",
                imageUrl: "https://raw.githubusercontent.com/hot-dao/media/main/logo.png",
                aboutUrl: "https://hot-labs.org/",
                universalLink: "https://t.me/herewalletbot?attach=wallet",
                bridgeUrl: "https://sse-bridge.hot-labs.org",
                jsBridgeKey: "hotWallet",
                platforms: ["ios", "android", "macos", "windows", "linux", "chrome", "safari", "firefox"]
              },
              {
                appName: "u2uWallet",
                name: "U2U Wallet",
                imageUrl: "https://u2-images.s3.ap-southeast-1.amazonaws.com/hdw/logo.jpg",
                aboutUrl: "https://u2u.xyz/ecosystem",
                deepLink: "u2wallet-tc://",
                universalLink: "https://u2u-wallet-app.uniultra.xyz/ton-connect",
                bridgeUrl: "https://ton-bridge.uniultra.xyz/bridge",
                platforms: ["ios", "android"]
              },
              {
                appName: "koloWeb3Wallet",
                name: "Kolo Web3 Wallet",
                imageUrl: "https://raw.githubusercontent.com/onidev1/tc-assets/refs/heads/main/kolo_logo_288.png",
                aboutUrl: "https://kolo.in/ua/cryptowallet",
                universalLink: "https://t.me/kolo?attach=wallet",
                bridgeUrl: "https://web3-bridge.kolo.in/",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "walletverse",
                name: "Walletverse",
                imageUrl: "https://bridge.walletverse.io/logo.png",
                aboutUrl: "https://walletverse.io",
                universalLink: "https://bridge.walletverse.io/tonconnect",
                bridgeUrl: "https://bridge.walletverse.io/sse/bridge",
                jsBridgeKey: "walletverse",
                platforms: ["ios", "android"]
              },
              {
                appName: "bybitMiniWallet",
                name: "Bybit Mini Wallet",
                imageUrl: "https://raw.githubusercontent.com/bybit-web3/bybit-web3.github.io/main/docs/images/bybit-logo.png",
                aboutUrl: "https://www.bybit.com/web3",
                universalLink: "https://t.me/Bybit_Web3_wallet_bot?attach=wallet",
                bridgeUrl: "https://api-node.bybit.com/spot/api/web3/bridge/ton/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
              },
              {
                appName: "ONTO",
                name: "ONTO",
                imageUrl: "https://app.ont.io/ontoMsgPic/onto.png",
                tondns: "onto.app",
                aboutUrl: "https://onto.app",
                universalLink: "https://link.onto.app/ton-connect",
                jsBridgeKey: "onto",
                platforms: ["ios", "android"]
              },
              {
                appName: "defiway",
                name: "Defiway",
                imageUrl: "https://fs.defiway.com/icons/tonconnect-icon.png",
                aboutUrl: "https://wallet.defiway.com",
                universalLink: "https://wallet.defiway.com/ton-connect",
                deepLink: "defiway-tc://",
                bridgeUrl: "https://api.defiway.com/ton-connect",
                jsBridgeKey: "defiway",
                platforms: ["ios", "android", "chrome", "safari"]
              },
              {
                appName: "exoduswallet",
                name: "Exodus",
                imageUrl: "https://www.exodus.com/brand/dl/images/Exodus_symbol.png",
                aboutUrl: "https://www.exodus.com/",
                jsBridgeKey: "exoduswallet",
                platforms: ["ios", "android", "chrome"]
              },
              {
                appName: "echoooTonWallet",
                name: "EchoooWallet",
                imageUrl: "https://cdn.echooo.xyz/front-end/fw/2025-01-20/f27b7b41-66b4-4b5d-b3d4-a3ac1d8b34ba.png",
                aboutUrl: "https://www.echooo.xyz",
                universalLink: "https://www.echooo.xyz",
                deepLink: "echooo://",
                jsBridgeKey: "echoooTonWallet",
                bridgeUrl: "https://ton-connect-bridge.echooo.link/bridge",
                platforms: ["ios", "android", "macos", "windows", "linux"]
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
