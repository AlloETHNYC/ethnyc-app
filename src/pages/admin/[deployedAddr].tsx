import { BigNumber, Contract } from "ethers";
import { useRouter } from "next/router"
import { FACTORY_ABI } from "../../ABIs/factory";
import { factoryInfo } from "../../settings";

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

    return(
        <div>
            Address: {deployedAddr}
        </div>
    )
}

export default Admin

function useEthers(): { library: any; } {
    throw new Error("Function not implemented.");
}
