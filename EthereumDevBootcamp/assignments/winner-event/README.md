# Week 4 - Assignment

The aim of this project was to find out how to emit the Winner event on an external contract on goerli at [0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502](https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502).

The external contract's code is the next one:

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
```

To run my solution you need to:

- have an `.env` file with `TESTNET_PRIVATE_KEY` and `ALCHEMY_TESTNET_RPC_URL` env vars filled with values;
- run `yarn run hardhat run scripts/deploy.ts --network goerli`

### On goerli:

External Contract: [0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502](https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502)
My Contract Solution: [0x5A6B596690Df492Dc3DaA1e6ADFFD8bde39aF3D0](https://goerli.etherscan.io/address/0x5A6B596690Df492Dc3DaA1e6ADFFD8bde39aF3D0)
Transaction: [0xb7dd7758e97ea79e1020423181edd78d2a6d76c01b97134a5a69f728acd58379](https://goerli.etherscan.io/tx/0xb7dd7758e97ea79e1020423181edd78d2a6d76c01b97134a5a69f728acd58379)
Event Log: [here](https://goerli.etherscan.io/tx/0xb7dd7758e97ea79e1020423181edd78d2a6d76c01b97134a5a69f728acd58379#eventlog)
