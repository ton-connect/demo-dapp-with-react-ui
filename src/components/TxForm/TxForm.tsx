import React, { useCallback, useState } from 'react';
import ReactJson, { InteractionProps } from 'react-json-view';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Cell, Address, beginCell, storeMessage, TonClient } from "@ton/ton";
import { Api, HttpClient } from 'tonapi-sdk-js';

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx: SendTransactionRequest = {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [

    {
      // The receiver's address.
      address: 'EQCKWpx7cNMpvmcN5ObM5lLUZHZRFKqYA4xmw9jOry0ZsF9M',
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: '5000000',
      // (optional) State initialization in boc base64 format.
      stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
      // (optional) Payload in boc base64 format.
      payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
    },

    // Uncomment the following message to send two messages in one transaction.
    /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */

  ],
};

export async function retry<T>(fn: () => Promise<T>, options: { retries: number, delay: number }): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (e instanceof Error) {
        lastError = e;
      }
      await new Promise(resolve => setTimeout(resolve, options.delay));
    }
  }
  throw lastError;
}

const client = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  apiKey: '8c2d45e1adc061fc45f9efb06de21b35303ed5c3c3416db5fa84dc8b5b3e40b4',
});

export function TxForm() {

  const [tx, setTx] = useState(defaultTx);

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  const onChange = useCallback((value: InteractionProps) => {
    setTx(value.updated_src as SendTransactionRequest)
  }, []);

  async function getTxByBOC(exBoc: string): Promise<string> {

    const myAddress = Address.parse(tonConnectUi.account!.address); // Address to fetch transactions from

    return retry(async () => {
      const transactions = await client.getTransactions(myAddress, {
        limit: 5,
      });
      for (const tx of transactions) {
        const inMsg = tx.inMessage;
        if (inMsg?.info.type === 'external-in') {

          const inBOC = inMsg?.body;
          if (typeof inBOC === 'undefined') {

            throw new Error('Invalid external');
            continue;
          }
          const extHash = Cell.fromBase64(exBoc).hash().toString('hex')
          const inHash = beginCell().store(storeMessage(inMsg)).endCell().hash().toString('hex')

          console.log(' hash BOC', extHash);
          console.log('inMsg hash', inHash);
          console.log('checking the tx', tx, tx.hash().toString('hex'));


          // Assuming `inBOC.hash()` is synchronous and returns a hash object with a `toString` method
          if (extHash === inHash) {
            console.log('Tx match');
            const txHash = tx.hash().toString('hex');
            console.log(`Transaction Hash: ${txHash}`);
            console.log(`Transaction LT: ${tx.lt}`);
            return (txHash);
          }
        }
      }
      throw new Error('Transaction not found');
    }, { retries: 30, delay: 1000 });
  }

  const handleSend = async () => {
    const res = await tonConnectUi.sendTransaction(tx);
    console.log(res);
    const hash = await getTxByBOC(res.boc);
    // const hash = Cell.fromBase64(res.boc).hash().toString('hex');
    console.log(`hash: ${hash}`);

    const apikey = 'AFPJTKEBPOX3AIYAAAAKA2HWOTRNJP5MUCV5DMDCZAAOCPSAYEYS3CILNQVLF2HWKED6USY'

    const httpClient = new HttpClient({
      baseUrl: 'https://testnet.tonapi.io',
      baseApiParams: {
        headers: {
          Authorization: `Bearer ${apikey}`,
          'Content-type': 'application/json'
        }
      }
    });

    // Initialize the API client
    const client = new Api(httpClient);

    // Fetch a typed array of account events
    const transactions = await client.blockchain.getBlockchainTransaction(hash);

    console.log(transactions, 'tx');

  }

  return (
    <div className="send-tx-form">
      <h3>Configure and send transaction</h3>

      <ReactJson theme="ocean" src={defaultTx} onEdit={onChange} onAdd={onChange} onDelete={onChange} />

      {wallet ? (
        <button onClick={handleSend}>
          Send transaction
        </button>
      ) : (
        <button onClick={() => tonConnectUi.openModal()}>
          Connect wallet to send the transaction
        </button>
      )}
    </div>
  );
}

