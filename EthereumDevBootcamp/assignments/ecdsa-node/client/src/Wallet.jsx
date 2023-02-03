import { useState } from "react";
import server from "./server";
import { getHexAddress } from "./utils";

function Wallet({ privateKey, setPrivateKey, balance, setBalance }) {
  const [address, setAddress] = useState("");

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    const address = getHexAddress(privateKey);
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Key
        <input
          placeholder="Type a private key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
