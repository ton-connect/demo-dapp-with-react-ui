import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";
import {TonProofDemoApi} from "./TonProofDemoApi";
import {TonProofDemo} from "./components/TonProofDemo/TonProofDemo";

function App() {

  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          getConnectParameters={() => TonProofDemoApi.connectWalletRequest}
          uiPreferences={{ theme: THEME.DARK }}
          /*walletsListConfiguration={{
            includeWallets: [...new Array(11)].map((_, index) => ({
                name: 'tonkeeper',
                bridgeUrl: `https://bridge${
                    index < 9 ? `0${index + 1}` : index + 1
                }.subgroup.org/bridge`,
                universalLink: 'https://app.tonkeeper.com/ton-connect',
                aboutUrl: '',
                imageUrl: 'https://tonkeeper.com/assets/tonconnect-icon.png'
            }))
        }}*/
      >
        <div className="app">
            <Header />
            <TxForm />
            <TonProofDemo />
            <Footer />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
