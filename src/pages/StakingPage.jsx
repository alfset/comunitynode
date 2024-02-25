import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        // Add other necessary chain configuration details here
      });
  
      // Request Keplr to enable the user's wallet for your chain
      await window.keplr.enable(chainId);
  
      // Get the offline signer for the user's wallet
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
  
      // Set the user's wallet address in your component's state
      setWalletAddress(accounts[0].address);
      console.log("Connected wallet address:", accounts[0].address);
      
      // Optionally, fetch validators after successful connection
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
      // Assuming the validators' staked amount is part of the response, otherwise, you'd need additional fetching logic here
      const validatorsData = data.validators || []; // Fallback to an empty array if undefined
      setValidators(validatorsData);
    } catch (error) {
      console.error('Failed to fetch validators:', error);
    } finally {
      setIsLoadingValidators(false);
    }
  };

  useEffect(() => {
    // Optionally, you might want to fetch validators on component mount
    // fetchValidators();
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
          <p>Loading validators...</p>
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