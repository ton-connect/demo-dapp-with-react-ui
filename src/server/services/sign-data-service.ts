import {
  Address,
  beginCell,
  Cell,
  contractAddress,
  loadStateInit,
} from "@ton/core";
import { sha256 } from "@ton/crypto";
import { Buffer } from "buffer";
import nacl from "tweetnacl";
import crc32 from "crc-32";
import {
  CheckSignDataRequestDto,
  SignDataPayloadText,
  SignDataPayloadBinary,
  SignDataPayload,
} from "../dto/check-sign-data-request-dto";
import { tryParsePublicKey } from "../wrappers/wallets-data";

const allowedDomains = ["ton-connect.github.io", "localhost:5173"];
const validAuthTime = 15 * 60; // 15 minutes

export class SignDataService {
  /**
   * Verifies sign-data signature.
   *
   * Supports three payload types:
   * 1. text - for text messages
   * 2. binary - for arbitrary binary data
   * 3. cell - for TON Cell with TL-B schema
   */
  public async checkSignData(
    payload: CheckSignDataRequestDto,
    getWalletPublicKey: (address: string) => Promise<Buffer | null>
  ): Promise<boolean> {
    try {
      const {
        signature,
        address,
        timestamp,
        domain,
        payload: signDataPayload,
        public_key,
        walletStateInit,
      } = payload;

      console.log("=== Sign Data Verification Started ===");
      console.log("Address:", address);
      console.log("Domain:", domain);
      console.log("Timestamp:", timestamp);
      console.log("Payload Type:", signDataPayload.type);
      console.log("Signature:", signature);
      console.log("WalletStateInit:", walletStateInit);

      // Check domain
      if (!allowedDomains.includes(domain)) {
        console.log("❌ Domain not allowed:", domain);
        return false;
      }
      console.log("✅ Domain check passed");

      // Check timestamp
      const now = Math.floor(Date.now() / 1000);
      if (now - validAuthTime > timestamp) {
        console.log(
          "❌ Timestamp expired - Now:",
          now,
          "Timestamp:",
          timestamp,
          "Valid time:",
          validAuthTime
        );
        return false;
      }
      console.log("✅ Timestamp check passed");

      // Parse address and state init
      const parsedAddr = Address.parse(address);
      const stateInit = loadStateInit(
        Cell.fromBase64(walletStateInit).beginParse()
      );

      // 1. First, try to obtain public key via get_public_key get-method on smart contract deployed at Address.
      // 2. If the smart contract is not deployed yet, or the get-method is missing, you need:
      //  2.1. Parse walletStateInit and get public key from stateInit.
      let publicKey =
        tryParsePublicKey(stateInit) ?? (await getWalletPublicKey(address));
      if (!publicKey) {
        console.log("❌ Public key not found for address:", address);
        return false;
      }
      console.log("✅ Public key obtained");

      // 2.2. Check that provided public key equals to obtained public key
      const wantedPublicKey = Buffer.from(public_key, "hex");
      if (!publicKey.equals(wantedPublicKey)) {
        console.log("❌ Public key mismatch");
        console.log("Expected:", wantedPublicKey.toString("hex"));
        console.log("Got:", publicKey.toString("hex"));
        return false;
      }
      console.log("✅ Public key verification passed");

      // 2.3. Check that walletStateInit.hash() equals to address
      const wantedAddress = Address.parse(address);
      const contractAddr = contractAddress(wantedAddress.workChain, stateInit);
      if (!contractAddr.equals(wantedAddress)) {
        console.log("❌ Address mismatch with state init");
        console.log("Expected:", wantedAddress.toString());
        console.log("Got:", contractAddr.toString());
        return false;
      }
      console.log("✅ Address verification passed");

      // Create hash based on payload type
      const finalHash =
        signDataPayload.type === "cell"
          ? this.createCellHash(signDataPayload, parsedAddr, domain, timestamp)
          : await this.createTextBinaryHash(
              signDataPayload,
              parsedAddr,
              domain,
              timestamp
            );

      console.log("=== Hash Creation ===");
      console.log("Payload Type:", signDataPayload.type);
      console.log("Hash Length:", finalHash.length);
      console.log("Hash Hex:", finalHash.toString("hex"));

      // Verify Ed25519 signature
      console.log("=== Signature Verification ===");
      const isValid = nacl.sign.detached.verify(
        new Uint8Array(finalHash),
        new Uint8Array(Buffer.from(signature, "base64")),
        new Uint8Array(publicKey)
      );

      console.log("Verification Result:", isValid ? "✅ VALID" : "❌ INVALID");
      return isValid;
    } catch (e) {
      console.error("Sign data verification error:", e);
      return false;
    }
  }

  /**
   * Creates hash for text or binary payload.
   * Message format:
   * message = 0xffff || "ton-connect/sign-data/" || workchain || address_hash || domain_len || domain || timestamp || payload
   */
  private async createTextBinaryHash(
    payload: SignDataPayloadText | SignDataPayloadBinary,
    parsedAddr: Address,
    domain: string,
    timestamp: number
  ): Promise<Buffer> {
    console.log("=== Creating Text/Binary Hash ===");
    console.log("Type:", payload.type);
    console.log(
      "Content:",
      payload.type === "text" ? payload.text : payload.bytes
    );
    console.log("Domain:", domain);
    console.log("Timestamp:", timestamp);
    console.log("Address:", parsedAddr.toString());

    // Create workchain buffer
    const wcBuffer = Buffer.alloc(4);
    wcBuffer.writeInt32BE(parsedAddr.workChain);

    // Create domain buffer
    const domainBuffer = Buffer.from(domain, "utf8");
    const domainLenBuffer = Buffer.alloc(4);
    domainLenBuffer.writeUInt32BE(domainBuffer.length);

    // Create timestamp buffer
    const tsBuffer = Buffer.alloc(8);
    tsBuffer.writeBigUInt64BE(BigInt(timestamp));

    // Create payload buffer
    const typePrefix = payload.type === "text" ? "txt" : "bin";
    const content = payload.type === "text" ? payload.text : payload.bytes;
    const encoding = payload.type === "text" ? "utf8" : "base64";

    const payloadPrefix = Buffer.from(typePrefix);
    const payloadBuffer = Buffer.from(content, encoding);
    const payloadLenBuffer = Buffer.alloc(4);
    payloadLenBuffer.writeUInt32BE(payloadBuffer.length);

    console.log("=== Hash Components ===");
    console.log("Workchain Buffer:", wcBuffer.toString("hex"));
    console.log("Address Hash:", parsedAddr.hash.toString("hex"));
    console.log("Domain Length:", domainLenBuffer.toString("hex"));
    console.log("Domain:", domainBuffer.toString("hex"));
    console.log("Timestamp:", tsBuffer.toString("hex"));
    console.log("Type Prefix:", payloadPrefix.toString("hex"));
    console.log("Payload Length:", payloadLenBuffer.toString("hex"));
    console.log("Payload Buffer:", payloadBuffer.toString("hex"));

    // Build message
    const message = Buffer.concat([
      Buffer.from([0xff, 0xff]),
      Buffer.from("ton-connect/sign-data/"),
      wcBuffer,
      parsedAddr.hash,
      domainLenBuffer,
      domainBuffer,
      tsBuffer,
      payloadPrefix,
      payloadLenBuffer,
      payloadBuffer,
    ]);

    console.log("=== Final Message ===");
    console.log("Message Length:", message.length);
    console.log("Message Hex:", message.toString("hex"));

    // Hash message with sha256
    const hash = await sha256(message);
    console.log("=== SHA256 Result ===");
    console.log("Hash:", Buffer.from(hash).toString("hex"));
    return Buffer.from(hash);
  }

  /**
   * Creates hash for Cell payload according to TON Connect specification.
   */
  private createCellHash(
    payload: SignDataPayload & { type: "cell" },
    parsedAddr: Address,
    domain: string,
    timestamp: number
  ): Buffer {
    const cell = Cell.fromBase64(payload.cell);
    const schemaHash = crc32.buf(Buffer.from(payload.schema, "utf8")) >>> 0; // unsigned crc32 hash

    const message = beginCell()
      .storeUint(0x75569022, 32) // prefix
      .storeUint(schemaHash, 32) // schema hash
      .storeUint(timestamp, 64) // timestamp
      .storeAddress(parsedAddr) // user wallet address
      .storeStringRefTail(domain) // app domain
      .storeRef(cell) // payload cell
      .endCell();

    return Buffer.from(message.hash());
  }
}
