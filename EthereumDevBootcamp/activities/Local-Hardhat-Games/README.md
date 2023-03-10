# Local Hardhat Games

Let's work on our solidity skills while deploying against a local hardhat blockchain! Inside this repository you'll find 5 smart contracts labled `Game1` to `Game5`. The goal of each smart contract is to:

1. Deploy it to our local hardhat network
2. Send some transaction(s) to emit the Winner event!

If you see the Winner event in the transaction receipt: congratulations, you're a winner! Let's talk about how to setup and run each game.

## 1. Install Depedencies

Install all depedencies with `yarn`.

## 2. Run the Hardhat Node

Let's go ahead and run our local node. You can do so by running `yarn run hardhat node`. This will spin up a local, persistent hardhat blockchain on your port 8545.

## 3. Deploy and Play the Games

On a different terminal you just need to run the script `yarn run hardhat run scripts/deployAndPlay.ts`.
