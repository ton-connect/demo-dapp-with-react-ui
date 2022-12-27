import React, {useCallback, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";


const defaultTx = {
	validUntil: Date.now() + 1000000,
	messages: [
		{
			address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F',
			amount: '20000000',
		},
		{
			address: '0:E69F10CC84877ABF539F83F879291E5CA169451BA7BCE91A37A5CED3AB8080D3',
			amount: '60000000',
		},
	],
};

export function TxForm() {
	const [tx, setTx] = useState(defaultTx);
	const wallet = useTonWallet();
	const [tonConnectUi] = useTonConnectUI();

	const onChange = useCallback((value: object) => setTx((value as { updated_src: typeof defaultTx }).updated_src), []);

	return (
		<div className="send-tx-form">
			<h3>Configure and send transaction</h3>
			<ReactJson src={defaultTx} theme="ocean" onEdit={onChange} onAdd={onChange} onDelete={onChange} />
			{wallet ? (
				<button onClick={() => tonConnectUi.sendTransaction(tx)}>
					Send transaction
				</button>
			) : (
				<button onClick={() => tonConnectUi.connectWallet()}>Connect wallet to send the transaction</button>
			)}
		</div>
	);
}
