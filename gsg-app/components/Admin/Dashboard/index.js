import { useEffect } from "react"
import Link from 'next/link'
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";



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

    const data = {
        a: 100
    }


    return (
        <div>
            Dashboard
            {/* List of previous quizz */}
            <Link
                href={{
                    pathname: '/admin/addquizz',
                    query: data
                }}
            >
               New Quizz
            </Link>


        </div>
    )
}