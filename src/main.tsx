import './patch-local-storage-for-github-pages';
import './polyfills';
import eruda from "eruda";

import React, {StrictMode} from 'react'
import {render} from 'react-dom';
import App from './App'
import './index.scss'
import {runSingleInstance} from "./utils/run-signle-instance";

eruda.init();

async function enableMocking() {
  return new Promise(async (resolve) => {
    const {worker} = await import('./server/worker');

    const startMockWorker = () => worker.start({
      onUnhandledRequest: 'bypass',
      quiet: false,
      serviceWorker: {
        url: `${import.meta.env.VITE_GH_PAGES ? '/demo-dapp-with-react-ui' : ''}/mockServiceWorker.js`
      }
    });
    let serviceWorkerRegistration = await startMockWorker();
    resolve(serviceWorkerRegistration);

    const verifyAndRestartWorker = runSingleInstance(async () => {
      const serviceWorkerRegistrations = await navigator.serviceWorker.getRegistrations();

      if (serviceWorkerRegistrations.length === 0) {
        await serviceWorkerRegistration?.unregister();
        serviceWorkerRegistration = await startMockWorker();
      }
    });

    setInterval(verifyAndRestartWorker, 1_000);
  });
}

enableMocking().then(() => render(
  <StrictMode>
    <App/>
  </StrictMode>,
  document.getElementById('root') as HTMLElement
));
