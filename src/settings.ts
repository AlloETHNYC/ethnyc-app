import { Config, Mumbai as _Mumbai } from "@usedapp/core";
import { Chain } from "@usedapp/core";

type SafeChain = Chain & { rpcUrl: string; networkName: string };

const MUMBAI_RPC_URL = "https://rpc-mumbai.maticvigil.com";
const MUMBAI_NETWORK_NAME = "polygon-mumbai";

const Mumbai: SafeChain = {
  ..._Mumbai,
  rpcUrl: MUMBAI_RPC_URL,
  networkName: MUMBAI_NETWORK_NAME,
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
  network: ActiveChain.chainName,
};

export const factoryInfo = {
  address: "0x915ee845Ab9C740Ff5937280f6A9fE8040f0ECf7",
  deployBlock: 26910081,
};

export const superfluidHostInfo = {
  address: "0xEB796bdb90fFA0f28255275e16936D25d3418603",
};

export const superfluidTokenFactoryInfo = {
  address: "0x200657E2f123761662567A1744f9ACAe50dF47E6",
};

export const GRAPH_API =
  "https://api.thegraph.com/subgraphs/name/ewitulsk/allo";
