import { Config, Mumbai as _Mumbai } from "@usedapp/core";
import { Chain } from "@usedapp/core";

type SafeChain = Chain & { rpcUrl: string; networkName: string; chainId: number};

const MUMBAI_RPC_URL = "https://rpc-mumbai.maticvigil.com";
const MUMBAI_NETWORK_NAME = "polygon-mumbai";
const MUMBAI_CHAIN_ID = 80001;

const Mumbai: SafeChain = {
  ..._Mumbai,
  rpcUrl: MUMBAI_RPC_URL,
  networkName: MUMBAI_NETWORK_NAME,
  chainId: MUMBAI_CHAIN_ID
};

export const ActiveChain: SafeChain = Mumbai;

export const config: Config = {
  readOnlyChainId: ActiveChain.chainId,
  readOnlyUrls: {
    [ActiveChain.chainId]: ActiveChain.rpcUrl,
  },
};

export const walletConnectOptions = {
  rpc: {
    [ActiveChain.chainId]: ActiveChain.rpcUrl,
  },
  chainId: ActiveChain.chainId,
  network: ActiveChain.chainName.toLowerCase(),
};

export const factoryInfo = {
  address: "0x0454603a57C72f53f7a078ce52c7E7ADD4201D47",
  deployBlock: 26913073,
};

export const superfluidHostInfo = {
  address: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
};

export const superfluidTokenFactoryInfo = {
  address: "0x200657E2f123761662567A1744f9ACAe50dF47E6",
};

export const GRAPH_API =
  "https://api.thegraph.com/subgraphs/name/ewitulsk/allo";
