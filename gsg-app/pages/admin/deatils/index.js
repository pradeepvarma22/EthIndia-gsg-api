import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"

import Connect from "../../../components/common/wallet/metamask"
import { ADMIN_INITIAL_STATE, adminReducer, WALLET_INITIAL_STATE, walletReducer } from "../../../reducers";

export default function Details() {
    const router = useRouter()
    const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
    const [adminState, adminDispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);
    const isAdmin = true;

    let quizzId = router.query.qid
    let userId = router.query.id

    async function getBaseData() {

        if (quizzId && userId) {

            const response = await fetch("http://127.0.0.1:8000/get_quizz_user_data/", {
                method: 'POST',
                body: JSON.stringify({
                    quizzId: quizzId,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('PRADEEP');
            const final = await response.json()
            console.log(final)

        }


    }


    useEffect(() => {
        quizzId = router.query.qid
        userId = router.query.id

        getBaseData();
    }, [])




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
                                    onLoadClick={true}
                                />
                            </div>
                        )
                }
            </div>


        </div>
    )
}   