import { useContractFunction } from "@usedapp/core"
import { BigNumber, Contract } from "ethers"
import { ERC20ABI } from "../ABIs/erc20";

const useTokenApprove = (tokenAddr: string, amount: BigNumber) => {
    const tokenContract = new Contract(tokenAddr, ERC20ABI);
    const {state, send, events, resetState} = useContractFunction(tokenContract, "approve", {transactionName: "TokenApprove"});


    return {state, send, events, resetState}
}

export default useTokenApprove