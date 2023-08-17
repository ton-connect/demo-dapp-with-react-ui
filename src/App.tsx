import './App.scss'
import {THEME, TonConnectUIProvider, TonConnect} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";

const connector = new TonConnect({
    manifestUrl: "https://demo-dapp.walletbot.net/demo-dapp/tonconnect-manifest.json",
    walletsListSource: 'https://raw.githubusercontent.com/ton-blockchain/wallets-list/feature/at-wallet/wallets.json'
})

function App() {
  return (
      <TonConnectUIProvider
          connector={connector}
          uiPreferences={{ theme: THEME.DARK }}
      >
        <div className="app">
            <Header />
            <TxForm />
            {/*<TonProofDemo />*/}
            <Footer />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
