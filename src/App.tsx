import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";

function App() {
  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
          uiPreferences={{ theme: THEME.DARK }}
          actionsConfiguration={{
              twaReturnUrl: 'https://t.me/tc_twa_test_bot'
          }}
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
