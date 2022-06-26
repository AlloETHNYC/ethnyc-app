import { useRouter } from "next/router"

const Admin = () => {
    const router = useRouter()
    const {deployedAddr} = router.query

    return(
        <div>
            Address: {deployedAddr}
        </div>
    )
}

export default Admin