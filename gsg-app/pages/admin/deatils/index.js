import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"
import Connect from "../../../components/common/wallet/metamask"
import { adminReducer, ADMIN_INITIAL_STATE, walletReducer, WALLET_INITIAL_STATE } from "../../../reducers";

export default function Details() {
    const router = useRouter()
    const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
    const [adminState, adminDispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);
    const isAdmin = true;
    
    

    console.log(router.query.id)
    console.log(router.query.qid)


    
    return (
        <div>
            <div>
                {
                    walletState.isWalletConnected ? (
                        <div>
                            Admin {walletState.walletAddress}

                        </div>
                    ) :
                        (
                            <div>
                                <Connect
                                    isAdmin={isAdmin}
                                    walletState={walletState}
                                    walletDispatch={walletDispatch}
                                    onLoadClick = {true}
                                />
                            </div>
                        )
                }
            </div>


        </div>
    )
}   