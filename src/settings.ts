import { Config, Mumbai as _Mumbai } from "@usedapp/core";
import { Chain } from "@usedapp/core";

type SafeChain = Chain & { rpcUrl: string };

const MUMBAI_RPC_URL = "https://rpc-mumbai.maticvigil.com";

const Mumbai: SafeChain = {
  ..._Mumbai,
  rpcUrl: MUMBAI_RPC_URL,
};

const ActiveChain: SafeChain = Mumbai;

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
  address: "0x018ae9882921bfffb7fef8f27e8dfc6b4053f0b0",
  deployBlock: 26906368
}

export const GRAPH_API = "https://api.thegraph.com/subgraphs/name/ewitulsk/allo";