import { BigNumber, Contract } from "ethers";
import { useRouter } from "next/router"
import { FACTORY_ABI } from "../../ABIs/factory";
import { factoryInfo } from "../../settings";
import { useEthers } from "@usedapp/core";
import { COMPANY_ABI } from "../../ABIs/company";
import { useEffect } from "react";

const Admin = () => {
    const router = useRouter()
    const {deployedAddr} = router.query

    const {library} = useEthers();

    async function createAllocationStream(receiverAddr: string, amount: number){
        const companyContract = new Contract(factoryInfo.address, FACTORY_ABI, library?.getSigner());  
        const vestingPeriodInYears = await companyContract.vestingPeriod();
        const flowRate = calculateFlowRate(vestingPeriodInYears, amount);
        await companyContract.addReceiver(receiverAddr, flowRate);
      }
    
      const SECONDS_PER_YEAR = 60 * 60 * 24 * 365; 
    
      function calculateFlowRate(vestingPeriodInYears: number, amount: number){
        const vestingPeriodInSeconds = vestingPeriodInYears * SECONDS_PER_YEAR;
        const flowRate = amount / vestingPeriodInSeconds;
        return BigNumber.from(flowRate);
      }

      async function getTokenSupply(companyAddr: string){
        const companyContract = new Contract(companyAddr, COMPANY_ABI, library?.getSigner());  
        const totalSupply = await companyContract.totalSupply();
        return totalSupply;
      }

      async function getNFTOwner(companyAddr: string, tokenId: number){
        const companyContract = new Contract(companyAddr, COMPANY_ABI, library?.getSigner());  
        const owner = await companyContract.ownerOf(tokenId);
        return owner;
      }

      async function getNFTList(companyAddr: string){
        const totalSupply = await getTokenSupply(companyAddr)
        let nftList = []

        for(let tokenId=0; tokenId<totalSupply; tokenId++){
            const owner = await getNFTOwner(companyAddr, tokenId);

            nftList.push({
                owner: owner,
                tokenId: tokenId,
                companyAddr: companyAddr
            })
        }  
        
        return nftList;
      }

    useEffect(()=>{
        async function asycnFunc(){
            console.log(deployedAddr)
            if(deployedAddr){
                const nftList = getNFTList(deployedAddr[0]);
                console.log(nftList)
            }
        }   
        //asycnFunc()
    })

    return(
        <div>
            Address: {deployedAddr}
        </div>
    )
}

export default Admin
