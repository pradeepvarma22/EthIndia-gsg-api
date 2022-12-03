import { providers, utils } from 'ethers';
import { useEffect, useRef } from 'react';
import Web3Modal from 'web3modal';

import { WALLET_ACTIONS } from '../../../../reducers';

export default function Connect({ isAdmin, walletState, walletDispatch, onLoadClick }) {

    const web3ModalRef = useRef();


    useEffect(() => {
        if (walletState.isWalletConnected == false && onLoadClick) {
            connect()
        }
    }, [walletState.isWalletConnected])



    async function connect() {



        try {
            web3ModalRef.current = new Web3Modal({
                network: "mumbai",
                providerOptions: {},
                disabledInjectedProvider: false
            });


            let provider = await web3ModalRef.current.connect();
            let web3Provider = new providers.Web3Provider(provider);

            const { chainId } = await web3Provider.getNetwork();

            if (chainId != 80001) {
                await provider.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x13881" }],
                });
                provider = await web3ModalRef.current.connect();
                web3Provider = new providers.Web3Provider(provider);
            }

            const signer = await web3Provider.getSigner();
            const address = await signer.getAddress();
            const hexAddr = utils.getAddress(address)
            walletDispatch({ type: WALLET_ACTIONS.SET_WALLET_ADDRESS, payload: hexAddr })
            walletDispatch({ type: WALLET_ACTIONS.PROVIDER, payload: provider })

            if (isAdmin) {
                walletDispatch({ type: WALLET_ACTIONS.SET_ADMIN, payload: true })
            } else {
                walletDispatch({ type: WALLET_ACTIONS.SET_ADMIN, payload: false })
            }

            const URI = `${process.env.NEXT_PUBLIC_REST_API}/add_user/` 
            const response = await fetch(URI, {
                method: 'POST',
                body: JSON.stringify({
                    walletAddress: hexAddr,
                    isAdmin: isAdmin
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const final = await response.json()
            console.log(final)

            walletDispatch({ type: WALLET_ACTIONS.SET_WALLET_ID, payload: final.id })

        } catch (error) {
            console.log(error)
        }





    }


    return (
        <div>
            <button onClick={connect}> Login With Metamask</button>
        </div>
    )



}


/*
import { utils } from 'ethers';

const networkMap = {
  POLYGON_MAINNET: {
    chainId: utils.hexValue(137), // '0x89'
    chainName: "Matic(Polygon) Mainnet", 
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://www.polygonscan.com/"],
  },
  MUMBAI_TESTNET: {
    chainId: utils.hexValue(80001), // '0x13881'
    chainName: "Matic(Polygon) Mumbai Testnet",
    nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};


await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [networkMap.MUMBAI_TESTNET],
});


*/