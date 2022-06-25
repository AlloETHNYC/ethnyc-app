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

const GetWallet = ({ children }: PropsWithChildren) => {
    const { account, activate, deactivate, active } = useEthers();
    const [showModal, setShowModal] = useState(false);
    const [activateError, setActivateError] = useState("");
    const { error } = useEthers();
  
    useEffect(() => {
      if (error) {
        setActivateError(error.message);
      }
    }, [error])
  
    useEffect(() => {
      async function getCachedProvider(){
        const cacheProvider = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
        const web3Modal = new Web3Modal({
          providerOptions,
          cacheProvider: true
        });
        if(cacheProvider){        
          const provider = await web3Modal.connect()
          await activate(provider)
        }
      }
      
      console.log("Getting cached")
      getCachedProvider()
  
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
      } catch (error: any) {
        setActivateError(error.message);
      }
    };

    return(
        <div>
        {
            account 
            ? <div>
                Account: {account.substring(0, 6).concat("...")}
                <Button onClick={()=>{deactivate()}}>Disconnect</Button>
            </div>
            : <ActionIcon variant="default" onClick={activateProvider} size={30}>
                <MoonStars size={16} />
             </ActionIcon>
        }
        </div>
    )
}

export default GetWallet