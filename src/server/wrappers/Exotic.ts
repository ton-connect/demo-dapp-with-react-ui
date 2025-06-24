import {
  Address,
  beginCell,
  Cell,
  Dictionary,
  MessageRelaxed,
  storeMessageRelaxed,
} from '@ton/core';

export const Opcode = {
  VerifyMerkleProof: 0xc5375235,
  VerifyMerkleUpdate: 0x36ca9120,
  SendFromOwner: 0xbc2883b,
};

export type VerifyMerkleProof = { merkleRoot: Buffer; merkleProof: Cell };

export function buildVerifyMerkleProof(merkle: VerifyMerkleProof) {
  return beginCell()
    .storeUint(Opcode.VerifyMerkleProof, 32)
    .storeBuffer(merkle.merkleRoot, 32)
    .storeRef(merkle.merkleProof)
    .endCell();
}

export type VerifyMerkleUpdate = { merkleRoot: Buffer; merkleUpdate: Cell };

export function buildVerifyMerkleUpdate(merkle: VerifyMerkleUpdate) {
  return beginCell()
    .storeUint(Opcode.VerifyMerkleUpdate, 32)
    .storeBuffer(merkle.merkleRoot, 32)
    .storeRef(merkle.merkleUpdate)
    .endCell();
}

export type SendFromOwner = {
  messages: MessageRelaxed[];
  mode: number;
};

export function buildSendFromOwner(opts: SendFromOwner) {
  if (opts.messages.length > 4) {
    throw new Error('Too many messages, must not be greater than 4.');
  }

  const body = beginCell().storeUint(Opcode.SendFromOwner, 32);

  for (const message of opts.messages) {
    body.storeUint(opts.mode, 8);
    body.storeRef(beginCell().store(storeMessageRelaxed(message)).endCell());
  }

  return body.endCell();
}

export function randomAddress(workchain = 0): Address {
  const b = Buffer.alloc(32);
  for (let i = 0; i < 32; i++) {
    b[i] = Math.floor(Math.random() * 256);
  }
  return new Address(workchain, b);
}

export function merkleFixture() {
  const dict = Dictionary.empty(Dictionary.Keys.Address(), Dictionary.Values.Bool());
  const address = randomAddress();
  dict.set(address, true);
  for (let i = 0; i < 10; i++) {
    dict.set(randomAddress(), true);
  }
  const merkleRoot = beginCell().storeDictDirect(dict).endCell().hash();

  return { dict, address, merkleRoot };
}

export function buildSuccessMerkleProof() {
  const { dict, merkleRoot, address } = merkleFixture();
  const merkleProof = dict.generateMerkleProof(address);
  return { merkleRoot, merkleProof };
}

export function buildSuccessMerkleUpdate() {
  const { dict, address, merkleRoot } = merkleFixture();
  const merkleUpdate = dict.generateMerkleUpdate(address, false); // NOTE: this updates dictionary with new value
  return { merkleRoot, merkleUpdate };

}
