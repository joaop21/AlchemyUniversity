import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";

const settings = {
  //apiKey: YOUR ALCHEMY KEY HERE
  network: Network.ETH_MAINNET,
} as AlchemySettings;

const alchemy = new Alchemy(settings);

export default alchemy;
