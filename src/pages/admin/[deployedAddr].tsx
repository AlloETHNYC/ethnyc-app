import { BigNumber, Contract } from "ethers";
import { useRouter } from "next/router";
import { FACTORY_ABI } from "../../ABIs/factory";
import { factoryInfo } from "../../settings";
import { useEthers } from "@usedapp/core";
import { COMPANY_ABI } from "../../ABIs/company";
import { ERC20ABI } from "../../ABIs/erc20";
import { useEffect, useState } from "react";
import {
  NumberInput,
  Button,
  TextInput,
  Title,
  Stack,
  Group,
} from "@mantine/core";
import { utils } from "ethers";
import BreadcrumbsSimple from "../../components/BreadcrumbsSimple";

const Admin = () => {
  const router = useRouter();
  const { deployedAddr } = router.query;

  const { library, account } = useEthers();

  async function approveToken(
    tokenAddr: string,
    amount: string,
    spender: string
  ) {
    const depAmount = utils.parseUnits(amount, 18);
    console.log(tokenAddr, amount, spender, depAmount, typeof depAmount);
    const tokenContract = new Contract(
      tokenAddr,
      ERC20ABI,
      library?.getSigner()
    );
    await tokenContract.approve(
      spender,
      BigNumber.from(amount).mul(BigNumber.from(10).pow(18)).toString()
    );
  }

  async function depositToken(amount: number, companyAddr: string) {
    const companyContract = new Contract(
      companyAddr,
      COMPANY_ABI,
      library?.getSigner()
    );
    await companyContract.deposit(
      BigNumber.from(amount).mul(BigNumber.from(10).pow(18)).toString()
    );
  }

  async function createAllocationStream(
    companyAddr: string,
    receiverAddr: string,
    amount: number
  ) {
    const companyContract = new Contract(
      companyAddr,
      COMPANY_ABI,
      library?.getSigner()
    );
    const contractVestingPeriod = await companyContract.vestingPeriod();
    console.log("VestingFromContract: ", contractVestingPeriod);
    const vestingPeriodInYears = BigNumber.from(contractVestingPeriod);
    console.log("VestingBigNum", vestingPeriodInYears);
    console.log("VestingInYears", vestingPeriodInYears);
    const flowRate = calculateFlowRate(
      vestingPeriodInYears,
      BigNumber.from(amount)
    );
    console.log("Flow Rate: " + flowRate);
    await companyContract.addReceiver(receiverAddr, flowRate);
  }

  const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;

  function calculateFlowRate(
    vestingPeriodInYears: BigNumber,
    amount: BigNumber
  ) {
    const vestingPeriodInSeconds = vestingPeriodInYears.mul(
      BigNumber.from(SECONDS_PER_YEAR)
    );
    console.log("InSeconds: ", vestingPeriodInSeconds);
    const flowRate = amount
      .mul(BigNumber.from(10).pow(18))
      .div(vestingPeriodInSeconds);
    return flowRate;
  }

  //   async function getTokenSupply(companyAddr: string) {
  //     console.log('Company Addr: ' + companyAddr);
  //     const companyContract = new Contract(
  //       companyAddr,
  //       COMPANY_ABI,
  //       library?.getSigner()
  //     );
  //     const totalSupply = await companyContract.tokenIdTracker();
  //     return totalSupply;
  //   }

  async function getNFTOwner(companyAddr: string, tokenId: number) {
    const companyContract = new Contract(
      companyAddr,
      COMPANY_ABI,
      library?.getSigner()
    );
    const owner = await companyContract.ownerOf(tokenId);
    return owner;
  }

  async function getNFTList(companyAddr: string) {
    let nftList = [];

    for (let tokenId = 0; tokenId < 255; tokenId++) {
      try {
        const owner = await getNFTOwner(companyAddr, tokenId);

        nftList.push({
          owner: owner,
          tokenId: tokenId,
          companyAddr: companyAddr,
        });
      } catch (e) {
        console.log(e);
        break;
      }
    }
    return nftList;
  }

  async function getToken(companyAddr: string) {
    const companyContract = new Contract(
      companyAddr,
      COMPANY_ABI,
      library?.getSigner()
    );
    const tokenAddr = await companyContract.companyToken();
    return tokenAddr;
  }

  const [depositAmount, setDepositAmount] = useState(0);
  const [receiverAmount, setRecieverAmount] = useState(0);
  const [reciever, setReciever] = useState("");
  const [token, setToken] = useState("");

  //   const [streamInfo, setStreamInfo] = useState({})

  //     async function getStreamInfo(){
  //         console.log("Contract: " + deployedAddr)
  //         const company = new Contract(deployedAddr as string, COMPANY_ABI, library?.getSigner());
  //         const streamInfo = await company.getStreamInfo(account);
  //         return streamInfo;
  //     }

  //     useEffect(()=>{
  //         async function asyncFunc() {
  //             const _streamInfo = await getStreamInfo();
  //             console.log("Stream Info:")
  //             console.log(_streamInfo)
  //             setStreamInfo(_streamInfo)
  //         }
  //         if(deployedAddr && (deployedAddr as string).startsWith("0x") && account){
  //             asyncFunc();
  //         }

  //     }, [deployedAddr])

  useEffect(() => {
    async function asycnFunc() {
      //console.log(deployedAddr)
      if (deployedAddr && library) {
        const nftList = await getNFTList(deployedAddr as string);
        console.log(nftList);
        //const nftTokenSupply = await getTokenSupply(deployedAddr as string)
        //console.log(nftTokenSupply)

        const tokenAddr = await getToken(deployedAddr as string);
        console.log(tokenAddr);
        setToken(tokenAddr);
        console.log(tokenAddr);
      }
    }
    asycnFunc();
  }, [deployedAddr, library]);

  return (
    <div>
      <BreadcrumbsSimple
        items={[
          { title: "Admin", href: "/admin" },
          { title: "Create new transfer", href: "#" },
        ]}
      />
      <Title mt="lg" order={1}>
        Address {deployedAddr}
      </Title>
      <Stack mt="lg">
        <NumberInput
          placeholder="Amount"
          label="Amount To Transfer"
          required
          onChange={(val) => setDepositAmount(val || 0)}
        />
        <Group>
          <Button
            onClick={() => {
              approveToken(
                token,
                String(depositAmount),
                deployedAddr as string
              );
            }}
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              depositToken(depositAmount, deployedAddr as string);
            }}
          >
            Deposit
          </Button>
        </Group>
      </Stack>
      <Stack mt="lg">
        <TextInput
          placeholder="Address"
          label="Receiving Address"
          required
          onChange={(val) => {
            console.log("Val", val.target.value);
            setReciever(val.target.value);
          }}
        />

        <NumberInput
          placeholder="Amount"
          label="Amount"
          required
          onChange={(val) => {
            setRecieverAmount(val || 0);
          }}
        />

        <Button
          onClick={() => {
            console.log(deployedAddr as string, reciever, receiverAmount);
            createAllocationStream(
              deployedAddr as string,
              reciever,
              receiverAmount
            );
          }}
        >
          Create Stream
        </Button>
      </Stack>
    </div>
  );
};

export default Admin;
