import { PropsWithChildren } from "react";
import Image from "next/image";
import { AppShell, Header, Group, ActionIcon, Button } from "@mantine/core";
import { MoonStars } from "tabler-icons-react";

import { useState, useEffect } from "react";

import NavbarSimple from "./NavbarSimple";
import FooterSimple from "./FooterSimple";
import { MumbaiChain } from "../settings";
import { useEthers } from "@usedapp/core";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const Layout = ({ children }: PropsWithChildren) => {
  const { account, activate, deactivate } = useEthers();
  const [showModal, setShowModal] = useState(false);
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  const activateProvider = async () => {
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
            80001: "https://rpc-mumbai.maticvigil.com",
          },
          chianId: 80001,
          network: "mumbai",
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError("");
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
