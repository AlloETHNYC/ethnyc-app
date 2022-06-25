import { useEthers } from "@usedapp/core"
import { PropsWithChildren } from "react"
const AccountDisplay = ({children}: PropsWithChildren ) => {

    const {activateBrowserWallet, account} = useEthers()

    return(
        <div>
            Account: {account}
        </div>
    )
}

export default AccountDisplay