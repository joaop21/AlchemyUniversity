import { getPublicKey, sign } from "ethereum-cryptography/secp256k1";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

export function getHexAddress(privateKey) {
  const publicKey = getPublicKey(privateKey);
  const address = getETHAddress(publicKey);
  return "0x" + toHex(address);
}

/**
 * Gets a publicKey generated from secp and returns an address.
 *
 * It removes the first byte of the key because it only indicates
 * the format of the key. If it is compressed or not.
 * After hashing the publicKey, we need to take the last 20 bytes.
 *
 * */
function getETHAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}

export const signMessage = (msgHash, privateKey) =>
  sign(msgHash, privateKey, { recovered: true });

export function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}
