import React, { useState, useEffect } from 'react';
import abi from '../src/chai.json';
import { ethers } from 'ethers';
import Buy from './Component/Buy';
import Memos from './Component/Memos';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    connectedAddress: null,
  });

  const connectWallet = async () => {
    const contractAddress = "0x7BA7327F4A4492E7c5Fa6feA4b082D3ad77E5196";
    const contractABI = abi.abi;
    const ethereum = window.ethereum;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const connectedAddress = accounts[0]; // Get the first account
        setState({ provider, signer, contract, connectedAddress });
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("Metamask not detected");
    }
  };


  useEffect(() => {
    if (state.signer) {
      const getAddress = async () => {
        const address = await state.signer.getAddress();
        setState((prevState) => ({ ...prevState, connectedAddress: address }));
      };
      getAddress();
    }
  }, [state.signer]);

  return (
    <div>
      {state.connectedAddress ? (
        <p>Connected Address: {state.connectedAddress}</p>
      ) : (
        <div class='text-right'>
          <button class="btn btn-warning" onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
