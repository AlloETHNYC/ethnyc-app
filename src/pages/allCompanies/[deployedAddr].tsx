import { BigNumber, Contract } from "ethers";
import { useRouter } from "next/router"
import { FACTORY_ABI } from "../../ABIs/factory";
import { factoryInfo } from "../../settings";
import { useEthers } from "@usedapp/core";
import { COMPANY_ABI } from "../../ABIs/company";
import { ERC20ABI } from "../../ABIs/erc20";
import { useEffect, useState } from "react";
import { NumberInput, Button } from "@mantine/core";
import { utils } from "ethers";

const Employee = () => {
    const router = useRouter()
    const {deployedAddr} = router.query

    const {library, account} = useEthers();

    const [streamInfo, setStreamInfo] = useState({})
    
    async function getStreamInfo(){
        console.log("Contract: " + deployedAddr)
        const company = new Contract(deployedAddr as string, COMPANY_ABI, library?.getSigner());
        const streamInfo = await company.getStreamInfo(account);
        return streamInfo;
    }

    useEffect(()=>{
        async function asyncFunc() {
            const _streamInfo = await getStreamInfo();
            console.log(_streamInfo)
            setStreamInfo(_streamInfo)
        }
        if(deployedAddr && (deployedAddr as string).startsWith("0x") && account){
            asyncFunc();
        }
        
    }, [deployedAddr])

    return(
        <div>
            Employee in: {deployedAddr}
            <br/>
            Account: {account}
        </div>
    )
}

export default Employee
