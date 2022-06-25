import { Title } from "@mantine/core";
import { Framework, IStream, PagedResult } from "@superfluid-finance/sdk-core";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import BreadcrumbsSimple from "../components/BreadcrumbsSimple";
import StreamsTable from "../components/StreamsTable";
import { useSuperfluid, useSuperfluidQuery } from "../lib/superfluid";
import { ActiveChain } from "../settings";

const crumbs = [
  {
    title: "Receiver",
    href: "/receiver",
  },
];
const data = [
  {
    title: "Title",
    author: "Author",
    year: 2017,
    reviews: { positive: 23, negative: 5 },
  },
];

const Receiver = () => {
  const { account } = useEthers();
  const { result } = useSuperfluidQuery({
    query: (sf) => sf.query.listStreams({ sender: account }),
    enabled: !!account,
  });

  return (
    <>
      <BreadcrumbsSimple items={crumbs} />
      <Title order={1} mt="lg">
        Receiver
      </Title>
      {result && <StreamsTable mt="lg" streams={result.data} />}
    </>
  );
};

export default Receiver;
