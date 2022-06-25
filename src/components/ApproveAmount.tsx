import { BigNumber } from "ethers";
import useTokenApprove from "../hooks/useTokenApprove"
import { PropsWithChildren, useState } from "react";
import {Button, NumberInput, TextInput} from "@mantine/core"
import { Contract } from "ethers";
import { ERC20ABI } from "../ABIs/erc20";
import { useEthers } from "@usedapp/core";

const ApproveAmount = ({ children }: PropsWithChildren) => {

    const {library} = useEthers();
    const [amount, setAmount,] = useState(0);

    const tokenAddr = "0xd9D4bc496Af93606Ea1b083A4373545321A7F6A2"
    const spender = "0xBFC513358413a8Fcc7fe5629D7DF73A8ae561FA6"

    async function approveToken(tokenAddr: string, amount: number, spender: string) {
        const tokenContract = new Contract(tokenAddr, ERC20ABI, library?.getSigner());
        await tokenContract.approve(spender, amount);
    }

    return(
        <div>
            <NumberInput
            placeholder="Amount"
            label="Amount To Transfer"
            required
            onChange={(val) => setAmount(val||0)}
            />

            <Button
            onClick={() => {
                approveToken(tokenAddr, amount, spender);
            }}> 
                Approve
            </Button>
        </div>
    )
}

export default ApproveAmount