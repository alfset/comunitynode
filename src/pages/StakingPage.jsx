import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingGif from '../assets/animate1.gif';


const StakingPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [validators, setValidators] = useState([]);
  const [isLoadingValidators, setIsLoadingValidators] = useState(false);
  const connectKeplr = async () => {
    if (!window.keplr) {
      alert("Please install the Keplr extension.");
      return;
    }
  
    const chainId = "planq_7070-2"; // Replace with your actual chain ID
  
    try {
      // Suggest the chain to Keplr (if not already known)
      await window.keplr.experimentalSuggestChain({
        // Chain configuration details:
        chainId: chainId,
        chainName: "Planq",
        rpc: "https://rpc.planq.network",
        rest: "https://rest.planq.network",
      });
  
      await window.keplr.enable(chainId);
  
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
  
      setWalletAddress(accounts[0].address);
      console.log("Connected wallet address:", accounts[0].address);
      
      fetchValidators();
    } catch (error) {
      console.error("Failed to connect to the Keplr wallet:", error);
      alert("Could not connect to the Keplr wallet. See console for details.");
    }
  };
  const fetchValidators = async () => {
    setIsLoadingValidators(true);
    try {
      const response = await fetch('https://rest.planq.network/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED');
      const data = await response.json();
      const validatorsData = data.validators || []; // Fallback to an empty array if undefined
      setValidators(validatorsData);
    } catch (error) {
      console.error('Failed to fetch validators:', error);
    } finally {
      setIsLoadingValidators(false);
    }
  };

  useEffect(() => {
  
  }, []);

  return (
    <div>
      <h1>Staking Page</h1>
      <p>Connect to Keplr Wallet to proceed with staking.</p>
      <button onClick={connectKeplr} className="btn btn-primary">
        {walletAddress ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : "Connect to Keplr Wallet"}
      </button>
  
      <div className="mt-4">
        <h2>Active Validators</h2>
        {isLoadingValidators ? (
  <div className="d-flex justify-content-center">
    <img src={loadingGif} alt="Loading..." />
    <div className="d-flex justify-content-center">
        <text style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Loading All Validators</text>
      </div>
  </div>
) : (
          <div className="d-flex flex-wrap">
            {validators.map((validator, index) => (
              <div key={index} className="card m-2" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Moniker: {validator.description.moniker}</h5>
                  <p className="card-text">Address: {validator.operator_address}</p>
                  {/* Display the staked amount if available in the validator data */}
                  <p className="card-text">Staked Amount: {validator.tokens/1000000000000000000} PLQ</p> {/* Adjust the property name as per your API */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingPage;