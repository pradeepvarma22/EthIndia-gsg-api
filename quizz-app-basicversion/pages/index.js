import { ethers } from 'ethers'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Web3Modal from 'web3modal';

import { GSG_ABI, GSG_ADDRESS } from '../constants';
import styles from '../styles/Home.module.css'

export default function Home() {
  const web3ModalRef = useRef();
  const [walletAddress, setWalletAddress] = useState("")
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [quizzId, setQuizzId] = useState(0)
  const [amount, setAmount] = useState("0")
  const [winnersCount, setWinnersCount] = useState(0)
  const [stakeDone, setStakeDone] = useState(true)
  const [winners, setWinners] = useState([])
  const [temp, setTemp] = useState("")


  async function connect() {
    web3ModalRef.current = new Web3Modal({
      network: "mumbai",
      providerOptions: {},
      disabledInjectedProvider: false
    });

    let provider = await web3ModalRef.current.connect();
    let web3Provider = new ethers.providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();

    if (chainId != 80001) {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      provider = await web3ModalRef.current.connect();
      web3Provider = new ethers.providers.Web3Provider(provider);
    }

    const signer = await web3Provider.getSigner();
    const address = await signer.getAddress();
    const hexAddr = ethers.utils.getAddress(address)

    setWalletAddress(hexAddr)
    setIsWalletConnected(true)

  }

  async function stake() {
    let provider = await web3ModalRef.current.connect();
    let web3Provider = new ethers.providers.Web3Provider(provider);

    const signer = await web3Provider.getSigner();

    const contract = new ethers.Contract(GSG_ADDRESS, GSG_ABI, signer);
    const options = { value: ethers.utils.parseUnits(amount, 18) }

    let txnObject = await contract.stakeAmount(quizzId, winnersCount, options);
    txnObject = await txnObject.wait();
    alert('Staked')
    console.log(txnObject)

    setStakeDone(true)

  }

  function handleWinners() {

    let x = temp.split(",")

    setWinners([...x])


  }


  async function handleContract(){
    let provider = await web3ModalRef.current.connect();
    let web3Provider = new ethers.providers.Web3Provider(provider);

    const signer = await web3Provider.getSigner();

    const contract = new ethers.Contract(GSG_ADDRESS, GSG_ABI, signer);

    let txn = await contract.distribute(quizzId,winners, "" )
    txn = await txn.wait()
    alert('settled please check your wallets')
  } 


  
  return (
    <div>
      {stakeDone ? (
        <div>
          <input type="text" onChange={e => setTemp(e.target.value)} placeholder="WalletAddress [] " />
          <button onClick={(e)=>{handleWinners(); handleContract();}}>Reward</button>
        </div>
      ) : (
        <div>
          {isWalletConnected ? (
            <div>
              {walletAddress}
              <br />
              <input type="number" placeholder='Quizz id' onChange={e => setQuizzId(e.target.value)} />
              <br />
              <input type="number" placeholder='no of winners' onChange={e => setWinnersCount(e.target.value)} />
              <br />
              <input type="text" placeholder='amount' onChange={e => setAmount(e.target.value)} />
              <br />
              <button onClick={stake}>Stake</button>


            </div>
          ) :
            (
              <div>
                <button onClick={connect}>Connect To Wallet</button>
              </div>
            )


          }
        </div>
      )}



    </div>
  )
}
