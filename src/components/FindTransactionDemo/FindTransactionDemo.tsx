

import React, { useState } from 'react';
import ReactJson from 'react-json-view';

import './style.scss';
import { TonProofDemoApi } from '../../TonProofDemoApi';

export const FindTransactionDemo = () => {
    const [boc, setBoc] = useState('');
    const [network, setNetwork] = useState<'mainnet' | 'testnet'>('mainnet');
    const [txLoading, setTxLoading] = useState(false);
    const [txError, setTxError] = useState<string | null>(null);
    const [txResult, setTxResult] = useState<any>(null);

    const handleFindTx = async () => {
        setTxLoading(true);
        setTxError(null);
        setTxResult(null);
        try {
            const transaction = await TonProofDemoApi.findTransactionByExternalMessage(boc, network);
            if (!transaction) {
                setTxError('Transaction not found');
            } else {
                setTxResult(transaction);
            }
        } catch (err: any) {
            setTxError(err?.message || 'Unknown error');
        } finally {
            setTxLoading(false);
        }
    };

    return (
        <div className="find-transaction-demo">
            <h3>Find Transaction by External-in Message BOC</h3>
            <div className="find-transaction-demo__form">
                <textarea
                    placeholder="Paste external-in message BOC (base64)"
                    value={boc}
                    onChange={e => setBoc(e.target.value)}
                    rows={3}
                    style={{ fontFamily: 'monospace', fontSize: 14 }}
                />
                <div className="find-transaction-demo__select-row">
                    <label htmlFor="network-select">Network:</label>
                    <select id="network-select" value={network} onChange={e => setNetwork(e.target.value as 'mainnet' | 'testnet')}>
                        <option value="mainnet">mainnet</option>
                        <option value="testnet">testnet</option>
                    </select>
                </div>
                <button onClick={handleFindTx} disabled={txLoading || !boc}>
                    {txLoading ? 'Searching...' : 'Find Transaction'}
                </button>
                {txError && <div style={{ color: 'red' }}>{txError}</div>}
            </div>
            {txResult !== null && (
                <>
                    <div className="find-transaction-demo__json-label">Transaction</div>
                    <ReactJson src={txResult} name={false} theme="ocean" collapsed={false} />
                </>
            )}
        </div>
    );
};