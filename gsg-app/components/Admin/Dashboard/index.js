import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
import Link from 'next/link'
import { useEffect } from "react"

export default function Dashboard({ adminState, adminDispatch, walletState, walletDispatch }) {


    
    useEffect(() => {

        
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
