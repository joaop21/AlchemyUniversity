const {
  isValidHash,
  isValidSignature,
  recoverPublicKey,
  getETHAddress,
} = require("./utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x9a181c2b091afb7182abc62e3c02382a02327ec4": 100,
  "0x62eb0159b0df76b195394a55fd8e1bdaf9e82f76": 50,
  "0xb58e6b47cd2946ae3ede6f5917fbec946c4e6ba9": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { transaction, transactionHash, signature, recoveryBit } = req.body;

  if (!isValidHash(toString(transaction), transactionHash))
    return badRequest(res, "transaction Hash is invalid!");

  const publicKey = recoverPublicKey(transactionHash, signature, recoveryBit);

  if (!isValidSignature(signature, transactionHash, publicKey))
    return badRequest(res, "signature is invalid!");

  const sender = getETHAddress(publicKey);
  setInitialBalance(sender);
  setInitialBalance(transaction.recipient);

  if (balances[sender] < transaction.amount)
    return badRequest(res, "Not enough funds!");

  balances[sender] -= transaction.amount;
  balances[transaction.recipient] += transaction.amount;
  return res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function badRequest(response, message) {
  return response.status(400).send({ message });
}
