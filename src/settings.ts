import { Config, Mainnet } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { Chain } from '@usedapp/core'

export const ActiveChain: Chain = {
  chainId: 80001,
  chainName: 'mumbai',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://mumbai.polygonscan.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://mumbai.polygonscan.com/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'https://rpc-mumbai.maticvigil.com',
  blockExplorerUrl: 'https://mumbai.polygonscan.com/',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'M',
    decimals: 18,
  }
}

export const config: Config = {
    autoConnect: true,
    readOnlyChainId: ActiveChain.chainId,
    readOnlyUrls: {
        [ActiveChain.chainId]: 'https://rpc-mumbai.maticvigil.com',
    },
    networks: [ActiveChain]
}