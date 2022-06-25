import { createGetInitialProps } from "@mantine/next";
import { DAppProvider } from "@usedapp/core";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { config } from "../settings";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
            <Main />
            <NextScript />          
        </body>
      </Html>
    );
  }
}
