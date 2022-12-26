import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";

function App() {

  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          theme={THEME.DARK}
      >
        <div className="App">
            <Header />
            <TxForm />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
