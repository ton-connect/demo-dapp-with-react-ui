import React, {useCallback, useState} from 'react';
import ReactJson, {InteractionProps} from 'react-json-view';
import './style.scss';
import {SendTransactionRequest, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";

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

export function TxForm() {

  const [tx, setTx] = useState(defaultTx);

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  const onChange = useCallback((value: InteractionProps) => {
    setTx(value.updated_src as SendTransactionRequest)
  }, []);

  return (
    <div className="send-tx-form">
      <h3>Configure and send transaction</h3>

      <ReactJson theme="ocean" src={defaultTx} onEdit={onChange} onAdd={onChange} onDelete={onChange}/>

      {wallet ? (
        <button onClick={() => tonConnectUi.sendTransaction(tx)}>
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

