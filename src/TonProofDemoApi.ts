import {Account, ConnectAdditionalRequest, TonProofItemReplySuccess} from "@tonconnect/ui-react";
import './patch-local-storage-for-github-pages';

class TonProofDemoApiService {
	private localStorageKey = 'demo-api-access-token';

	private host = 'https://demo.tonconnect.dev';

	public accessToken: string | null = null;

	public readonly refreshIntervalMs = 9 * 60 * 1000;

	constructor() {
		this.accessToken = localStorage.getItem(this.localStorageKey);

		if (!this.accessToken) {
			this.generatePayload();
		}
	}

	async generatePayload(): Promise<ConnectAdditionalRequest | null> {
		try {
			const response = await (
				await fetch(`${this.host}/ton-proof/generatePayload`, {
					method: 'POST',
				})
			).json();
			return {tonProof: response.payload as string};
		} catch {
			return null;
		}

	}

	async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account) {
		try {
			const reqBody = {
				address: account.address,
				network: account.chain,
				proof: {
					...proof,
					state_init: account.walletStateInit,
				},
			};

			const response = await (
				await fetch(`${this.host}/ton-proof/checkProof`, {
					method: 'POST',
					body: JSON.stringify(reqBody),
				})
			).json();

			if (response?.token) {
				localStorage.setItem(this.localStorageKey, response.token);
				this.accessToken = response.token;
			}
		} catch (e) {
			console.log('checkProof error:', e);
		}
	}

	async getAccountInfo(account: Account) {
		const response = await (
			await fetch(`${this.host}/dapp/getAccountInfo?network=${account.chain}`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
					'Content-Type': 'application/json',
				},
			})
		).json();

		return response as {};
	}

	reset() {
		this.accessToken = null;
		localStorage.removeItem(this.localStorageKey);
		this.generatePayload();
	}
}

export const TonProofDemoApi = new TonProofDemoApiService();
