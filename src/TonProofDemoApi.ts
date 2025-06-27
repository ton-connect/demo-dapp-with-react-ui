import {
  Account,
  ConnectAdditionalRequest,
  SendTransactionRequest,
  TonProofItemReplySuccess,
} from "@tonconnect/ui-react";
import "./patch-local-storage-for-github-pages";
import { CreateJettonRequestDto } from "./server/dto/create-jetton-request-dto";

class TonProofDemoApiService {
  private readonly payloadTokenKey = "demo-api-payload-token";
  private readonly accessTokenKey = "demo-api-access-token";

  private host = document.baseURI.replace(/\/$/, "");

  public accessToken: string | null = null;

  public readonly refreshIntervalMs = 9 * 60 * 1000;

  constructor() {
    this.accessToken = localStorage.getItem(this.accessTokenKey);

    if (!this.accessToken) {
      this.generatePayload();
    }
  }

  async generatePayload(): Promise<ConnectAdditionalRequest | null> {
    try {
      const response = await (
        await fetch(`${this.host}/api/generate_payload`, {
          method: "POST",
        })
      ).json();
      localStorage.setItem(this.payloadTokenKey, response.payloadToken);
      return {
        tonProof: response.payloadTokenHash,
      };
    } catch {
      return null;
    }
  }

  async checkProof(
    proof: TonProofItemReplySuccess["proof"],
    account: Account
  ): Promise<void> {
    try {
      const reqBody = {
        address: account.address,
        network: account.chain,
        public_key: account.publicKey,
        proof: {
          ...proof,
          state_init: account.walletStateInit,
        },
        payloadToken: localStorage.getItem(this.payloadTokenKey)
      };

      const response = await (
        await fetch(`${this.host}/api/check_proof`, {
          method: "POST",
          body: JSON.stringify(reqBody),
        })
      ).json();

      if (response?.token) {
        localStorage.setItem(this.accessTokenKey, response.token);
        this.accessToken = response.token;
      }
    } catch (e) {
      console.log("checkProof error:", e);
    }
  }

  async getAccountInfo(account: Account) {
    const response = await (
      await fetch(`${this.host}/api/get_account_info`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      })
    ).json();

    return response as {};
  }

  async createJetton(
    jetton: CreateJettonRequestDto
  ): Promise<SendTransactionRequest> {
    return await (
      await fetch(`${this.host}/api/create_jetton`, {
        body: JSON.stringify(jetton),
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
    ).json();
  }

  async merkleProof(): Promise<SendTransactionRequest> {
    return await (
      await fetch(`${this.host}/api/merkle_proof`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-type": "application/json",
        },
        method: "POST",
        body: '',
      })
    ).json();
  }

  async merkleUpdate(): Promise<SendTransactionRequest> {
    return await (
      await fetch(`${this.host}/api/merkle_update`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-type": "application/json",
        },
        method: "POST",
      })
    ).json();
  }

  async checkSignData(signDataResult: any, account: Account) {
    try {
      const reqBody = {
        address: account.address,
        network: account.chain,
        public_key: account.publicKey,
        signature: signDataResult.signature,
        timestamp: signDataResult.timestamp,
        domain: signDataResult.domain,
        payload: signDataResult.payload,
        walletStateInit: account.walletStateInit,
      };

      const response = await (
        await fetch(`${this.host}/api/check_sign_data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        })
      ).json();

      return response;
    } catch (e) {
      console.log("checkSignData error:", e);
      return { error: "Failed to verify signature" };
    }
  }

  reset() {
    this.accessToken = null;
    localStorage.removeItem(this.accessTokenKey);
    this.generatePayload();
  }
}

export const TonProofDemoApi = new TonProofDemoApiService();
