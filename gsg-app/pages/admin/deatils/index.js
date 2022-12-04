import { ethers } from "ethers";
import { useRouter } from "next/router"
import { useEffect, useReducer, useRef, useState } from "react"
import Web3Modal from 'web3modal';
import { providers, utils } from 'ethers';

import Connect from "../../../components/common/wallet/metamask"
import { GSG_ABI, GSG_ADDRESS } from "../../../constants/gsg";
import { ADMIN_INITIAL_STATE, adminReducer, WALLET_INITIAL_STATE, walletReducer } from "../../../reducers";

export default function Details() {



    const web3ModalRef = useRef();

    const [amout, setAmount] = useState("0")
    const [noOfWinners, setNoOfWinners] = useState(0)

    const router = useRouter()
    const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE);
    const [adminState, adminDispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);
    const isAdmin = true;

    let quizzId = router.query.qid
    let userId = router.query.id

    async function getBaseData() {

        if (quizzId && userId) {
            const URI = `${process.env.NEXT_PUBLIC_REST_API}/get_quizz_user_data/`

            const response = await fetch(URI, {
                method: 'POST',
                body: JSON.stringify({
                    quizzId: quizzId,
                    userId: userId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const final = await response.json()


        }
    }

    useEffect(() => {
        quizzId = router.query.qid
        userId = router.query.id

        getBaseData();
    }, [])

    async function handleContract() {

        web3ModalRef.current = new Web3Modal({
            network: "mumbai",
            providerOptions: {},
            disabledInjectedProvider: false
        });

        let provider = await web3ModalRef.current.connect();
        let web3Provider = new providers.Web3Provider(provider);


        const signer = await web3Provider.getSigner();

        const contract = new ethers.Contract(GSG_ADDRESS, GSG_ABI, signer);
        const options = { value: ethers.utils.parseUnits(amout,18) }

        let txnObject = await contract.stakeAmount(quizzId, noOfWinners, options);
        txnObject = await txnObject.wait();
        console.log(txnObject)


        const URI = `${process.env.NEXT_PUBLIC_REST_API}/stake_done/${quizzId}/`
        //status==1
        const response = await fetch(URI, {
            method: 'POST',
            body: JSON.stringify({
                quizzId: quizzId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const final = await response.json()

        console.log(final)


    }




    return (
        <div>
            <div>
                {
                    walletState.isWalletConnected ? (
                        <div>
                            Admin {walletState.walletAddress}
                            Stake Your Amount
                            <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder="MATIC" />
                            <input type="number" onChange={(e) => setNoOfWinners(e.target.value)} placeholder="No of winners you have to give price" />
                            <button onClick={handleContract}>Stake</button>


                            {/* <ContractSetup /> */}
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