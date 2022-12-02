import { useEffect, useReducer } from "react"
import { Header, Connect } from "../components/common"
import { walletReducer, WALLET_INITIAL_STATE } from "../reducers"


export default function Home() {

  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
  const isAdmin = false;


  useEffect(() => {

    if (walletState.isWalletConnected) {

      localStorage.setItem("gsg_account_walletaddress", walletState.walletAddress)
      localStorage.setItem("gsg_account_isAdmin", walletState.isAdmin)

    }

  }, [walletState.isWalletConnected])

  return (
    <div>
      <Header title={"GSG-Quizz"} />
      {
        walletState.isWalletConnected ? (
          <div>
            {walletState.walletAddress}
          </div>
          
          // Admin Dashboard

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
