import { useEffect, useReducer } from "react"
import Dashboard from "../../components/Admin/Dashboard";

import { Connect, Header } from "../../components/common"
import { WALLET_INITIAL_STATE, walletReducer, adminReducer, ADMIN_INITIAL_STATE } from "../../reducers"

export default function Admin() {

    const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
    const [adminState, adminDispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);
    const isAdmin = true;



    useEffect(() => {

        if (walletState.isWalletConnected) {

            localStorage.setItem("gsg_account_walletaddress", walletState.walletAddress)
            localStorage.setItem("gsg_account_isAdmin", walletState.isAdmin)

        }

    }, [walletState.isWalletConnected])



    return (
        <div>
            <Header title={"Admin"} />
            
            {
                walletState.isWalletConnected ? (
                    <div>
                        Admin {walletState.walletAddress}
                        <Dashboard
                            adminState={adminState}
                            adminDispatch={adminDispatch}
                            walletState={walletState}
                            walletDispatch={walletDispatch}
                        />
                    </div>
                ) :
                    (
                        <div>
                            <Connect
                                isAdmin={isAdmin}
                                walletState={walletState}
                                walletDispatch={walletDispatch}
                            />
                        </div>
                    )
            }

        </div>
    )

}
