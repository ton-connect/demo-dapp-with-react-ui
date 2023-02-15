import React, {useCallback, useEffect, useState} from 'react';
import ReactJson from 'react-json-view';
import './style.scss';
import {TonProofDemoApi} from "../../TonProofDemoApi";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {CHAIN} from "@tonconnect/sdk";


export const TonProofDemo = () => {
	const [data, setData] = useState({});
	const wallet = useTonWallet();
	const [authorized, setAuthorized] = useState(false);
	const [tonConnectUI] = useTonConnectUI();

	useEffect(() =>
		tonConnectUI.onStatusChange(async w => {
			if (!w || w.account.chain === CHAIN.TESTNET) {
				TonProofDemoApi.reset();
				setAuthorized(false);
				return;
			}

			if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
				await TonProofDemoApi.checkProof(w.connectItems.tonProof.proof, w.account);
			}

			if (!TonProofDemoApi.accessToken) {
				tonConnectUI.disconnect();
				setAuthorized(false);
				return;
			}

			setAuthorized(true);
		}), [tonConnectUI]);


	const handleClick = useCallback(async () => {
		if (!wallet) {
			return;
		}
		const response = await TonProofDemoApi.getAccountInfo(wallet.account);

		setData(response);
	}, [wallet]);

	if (!authorized) {
		return null;
	}

	return (
		<div className="ton-proof-demo">
			<h3>Demo backend API with ton_proof verification</h3>
			{authorized ? (
				<button onClick={handleClick}>
					Call backend getAccountInfo()
				</button>
			) : (
				<div className="ton-proof-demo__error">Connect wallet to call API</div>
			)}
			<ReactJson src={data} name="response" theme="ocean" />
		</div>
	);
}
