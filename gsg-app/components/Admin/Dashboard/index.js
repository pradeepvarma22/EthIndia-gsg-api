import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
import Link from 'next/link'
import { useEffect } from "react"

export default function Dashboard({ adminState, adminDispatch, walletState, walletDispatch }) {

    // async function onPageLoad(){
    //     const provider = await detectEthereumProvider();
    //     console.log(provider)
    //     const provider1 = new ethers.providers.Web3Provider(provider)
    //     const signer = await provider1.getSigner();
    //     const addr = await signer.getAddress();
    //     console.log(addr)
    // }   

    // async function dummy(){
    //     await  onPageLoad()
    // }

    useEffect(() => {
        // on page load load admin previous quizz

    }, [])




    return (
        <div>
            Dashboard
            {/* List of previous quizz */}
            <Link
                href={{
                    pathname: `/admin/addquizz/${walletState.walletId}`,
                }}
            >
                New Quizz
            </Link>


        </div>
    )
}
