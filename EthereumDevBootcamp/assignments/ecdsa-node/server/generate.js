const { toHex } = require("ethereum-cryptography/utils");
const { getETHAddress, generatePrivateKey, getPublicKey } = require("./utils");

const privateKey = generatePrivateKey();
const publicKey = getPublicKey(privateKey);
const address = getETHAddress(publicKey);

console.log("privateKey:", toHex(privateKey));
console.log("publicKey:", toHex(publicKey));
console.log("address:", address);
