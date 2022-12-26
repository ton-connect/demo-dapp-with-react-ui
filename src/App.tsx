import './App.scss'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {Header} from "./components/Header/Header";
import {TxForm} from "./components/TxForm/TxForm";
import {Footer} from "./components/Footer/Footer";

function App() {

  return (
      <TonConnectUIProvider
          manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
          theme={THEME.DARK}
      >
        <div className="app">
            <Header />
            <TxForm />
            <Footer />
        </div>
      </TonConnectUIProvider>
  )
}

export default App
