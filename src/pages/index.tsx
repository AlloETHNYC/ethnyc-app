import { Title } from "@mantine/core";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ApproveAmount from "../components/ApproveAmount";

const Home: NextPage = () => {
  const { account } = useEthers();
  //const balance = useEtherBalance(account);
  //const logs = useAccountCompanies();

  const router = useRouter()

  useEffect(() => {
    router.push("/companies")
  }, [])

  return (
    <div>
      {<Title order={1}>Your application goes here.</Title>}
      <ApproveAmount/>
      {/*balance && <div>Balance: {formatEther(balance)}</div>*/}
    </div>
  );
};
export default Home;
