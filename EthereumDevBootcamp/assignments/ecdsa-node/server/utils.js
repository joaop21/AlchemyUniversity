const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function isValidHash(message, hash) {
  return toHex(hashMessage(message)) === hash;
}

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

function isValidSignature(signature, transactionHash, publicKey) {
  return secp.verify(signature, transactionHash, publicKey);
}

function recoverPublicKey(messageHash, signature, recoveryBit) {
  return secp.recoverPublicKey(messageHash, signature, recoveryBit);
}

function getETHAddress(publicKey) {
  return "0x" + toHex(getAddress(publicKey));
}

/**
 * Gets a publicKey generated from secp and returns an address.
 *
 * It removes the first byte of the key because it only indicates
 * the format of the key. If it is compressed or not.
 * After hashing the publicKey, we need to take the last 20 bytes.
 *
 * */
function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}

const generatePrivateKey = () => secp.utils.randomPrivateKey();

const getPublicKey = (privateKey) => secp.getPublicKey(privateKey);

module.exports = {
  isValidHash,
  isValidSignature,
  generatePrivateKey,
  getETHAddress,
  getPublicKey,
  recoverPublicKey,
};
