import { PropsWithChildren } from "react";
import { Button } from "@mantine/core";
import { PlugConnected } from "tabler-icons-react";

import { useState, useEffect } from "react";

import { useEthers } from "@usedapp/core";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal, { local } from "web3modal";
import { walletConnectOptions } from "../settings";
import AccountButton from "./AccountButton";

const GetWallet = () => {
  const { account, activate, deactivate } = useEthers();
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  useEffect(() => {
    async function getCachedProvider() {
      const cacheProvider = localStorage.getItem(
        "WEB3_CONNECT_CACHED_PROVIDER"
      );

      console.log(providerOptions)
      
      if (cacheProvider) {
        const web3Modal = new Web3Modal({
          providerOptions,
          cacheProvider: true,
        });
        const provider = await web3Modal.connect();
        await activate(provider);
      }
    }

    console.log("Getting cached");
    getCachedProvider();
  }, []);

  const providerOptions = {
    injected: {
      display: {
        name: "Metamask",
        description: "Connect with the provider in your Browser",
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: walletConnectOptions,
    },
  };

  const activateProvider = async () => {
    const web3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: true,
    });

    try {
      web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError("");
    } catch (error: any) {
      setActivateError(error.message);
    }
  };

  return (
    <div>
      {account ? (
        <AccountButton address={account} onDisconnect={deactivate} />
      ) : (
        <Button
          variant="light"
          rightIcon={<PlugConnected size={20} />}
          radius="xl"
          size="sm"
          styles={{
            rightIcon: { marginLeft: 16 },
          }}
          onClick={activateProvider}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default GetWallet;
