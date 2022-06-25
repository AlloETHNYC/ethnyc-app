import { PropsWithChildren } from "react";
import Image from "next/image";
import { AppShell, Header, Group, ActionIcon, Button } from "@mantine/core";
import { MoonStars } from "tabler-icons-react";

import { useState, useEffect } from "react";

import NavbarSimple from "./NavbarSimple";
import FooterSimple from "./FooterSimple";
import {ActiveChain} from "../settings"
import { useEthers } from "@usedapp/core"; 

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal, { local } from 'web3modal'

const Layout = ({ children }: PropsWithChildren) => {
  const { account, activate, deactivate } = useEthers();
  const [showModal, setShowModal] = useState(false);
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();

  const [web3, setWeb3] = useState({} as any);

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }

    // async function getCachedProvider(){
    //   const cacheProvider = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
    //   if(cacheProvider){
    //     console.log("Cached: "+cacheProvider)
    //     const web3Modal = new Web3Modal();
    //     web3Modal.connectTo(cacheProvider)
    //     const provider = await web3Modal.connect();

    //     setWeb3(provider)
    //     await activate(provider)
    //   }
    // }
    
    // console.log("Getting cached")
    // getCachedProvider()

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
      options: {
        rpc: {
          [ActiveChain.chainId]: ActiveChain.rpcUrl

        },
        chianId: ActiveChain.chainId,
        network: ActiveChain.chainName,
      },
    },
  };

  
  const activateProvider = async () => {
    const web3Modal = new Web3Modal({
      providerOptions,
      cacheProvider: true
    });

    try {
      web3Modal.clearCachedProvider()
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
      setWeb3(web3Modal)
    } catch (error: any) {
      setActivateError(error.message);
    }
  };

  return (
    <AppShell
      padding="md"
      navbar={<NavbarSimple />}
      header={
        <Header height={60}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Image src="/images/allo_logo.svg" height={65} width={120} />
            <ActionIcon variant="default" onClick={activateProvider} size={30}>
              <MoonStars size={16} />
            </ActionIcon>
          </Group>
        </Header>
      }
      footer={
        <FooterSimple
          links={[
            { link: "/", label: "Home" },
            { link: "/", label: "Privacy" },
            { link: "/", label: "Careers" },
          ]}
        />
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
