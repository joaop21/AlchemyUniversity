import assert from "assert";
import axios from "axios";

assert(process.env.ALCHEMY_API_KEY);

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

axios
  .post<any>(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBlockByNumber",
    params: [
      "0xb443", // block 46147
      false, // retrieve the full transaction object in transactions array
    ],
  })
  .then((response) => {
    console.log(response.data.result);
  });

axios
  .post<any>(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTransactionByHash",
    params: [
      "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060", // transaction in the block 46147
    ],
  })
  .then((response) => {
    console.log(response.data.result);
  });
