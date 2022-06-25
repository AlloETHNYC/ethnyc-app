import { AppProps } from "next/app";
import Head from "next/head";
import { Global, MantineProvider } from "@mantine/core";
import Layout from "../components/Layout";
import { DAppProvider } from "@usedapp/core";
import { config } from "../settings";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ETHNewYork Hackathon</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DAppProvider config={config}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <Global
            styles={() => ({
              ".web3modal-modal-lightbox": {
                zIndex: "101 !important",
              },
            })}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </DAppProvider>
    </>
  );
};

export default App;
