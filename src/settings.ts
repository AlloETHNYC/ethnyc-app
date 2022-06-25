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
