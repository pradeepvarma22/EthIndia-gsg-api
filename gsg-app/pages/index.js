import { useEffect, useReducer, useState } from "react"
import { Header, Connect } from "../components/common"
import { walletReducer, WALLET_INITIAL_STATE } from "../reducers"


export default function Home() {

  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
  const isAdmin = false;
  const [quizzId, setQuizzId] = useState(-1)
  const [waitState, setWaitState] = useState(false)


  useEffect(() => {

    if (walletState.isWalletConnected) {

      localStorage.setItem("gsg_account_walletaddress", walletState.walletAddress)
      localStorage.setItem("gsg_account_isAdmin", walletState.isAdmin)

    }

  }, [walletState.isWalletConnected])


  function handleQuizz() {
    setWaitState(true)
    

  }

  return (
    <div>
      <Header title={"GSG-Quizz"} />
      {
        walletState.isWalletConnected ? (
          <div>
            {walletState.walletAddress}

            {waitState == false  ? (
              <div>
                <input type="number" placeholder="QUizz Id" onChange={e => setQuizzId(e.target.value)} />
                <button onClick={handleQuizz}>Enter The Quizz</button>
              </div>
            ) : (
              <div>

              </div>
            )}


          </div>

          // Admin Dashboard

        ) :
          (
            <div>
              <Connect
                isAdmin={isAdmin}
                walletState={walletState}
                walletDispatch={walletDispatch}
                onLoadClick={false}
              />
            </div>
          )
      }

    </div>

  )

}
