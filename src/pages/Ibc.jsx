import React, { useState } from 'react';
import { SigningStargateClient } from '@cosmjs/stargate';

const chains = {
  gaia: {
    chainId: 'cosmoshub-4',
    rpcEndpoint: 'https://rpc.cosmos.network',
    sourceChannel: 'channel-141',
  },
  akash: {
    chainId: 'akashnet-2',
    rpcEndpoint: 'https://rpc.akash.forbole.com',
    sourceChannel: 'channel-180',
  },
  osmosis: {
    chainId: 'osmosis-1',
    rpcEndpoint: 'https://rpc.osmosis.zone',
    sourceChannel: 'channel-106',
  },
  planq: {
    chainId: 'planq_7070-2',
    rpcEndpoint: 'https://rpc.planq.network',
    sourceChannel: 'channel-25',
  },
};
const destinationChains = {
    akash: {
      displayName: 'Akash Network',
    },
    celestia: {
      displayName: 'Celestia',
    },
    cosmos: {
      displayName: 'Cosmos Hub',
    },
    osmosis: {
      displayName: 'Osmosis',
    },
    orai: {
      displayName: 'Oraichain',
    },
    planq: {
        displayName: 'Planq',
      },
  };

  const IbcTransfer = () => {
    const [address, setAddress] = useState('');
    const [connectedChains, setConnectedChains] = useState([]); // Track connected chains
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedSourceChain, setSelectedSourceChain] = useState('');
    const [selectedDestinationChain, setSelectedDestinationChain] = useState('akash');
  
    const handleSelectChain = (chainKey) => {
      connectWallet(chainKey);
    };
  
    const connectWallet = async (chainKey) => {
      const chainInfo = chains[chainKey];
      if (!window.getOfflineSigner || !window.keplr) {
        alert('Please install Keplr extension');
        return;
      }
      
      try {
        await window.keplr.enable(chainInfo.chainId);
        const offlineSigner = window.getOfflineSigner(chainInfo.chainId);
        const accounts = await offlineSigner.getAccounts();
        setAddress(accounts[0].address);
        // Add the chain to the connectedChains list if it's not already present
        if (!connectedChains.includes(chainKey)) {
          setConnectedChains([...connectedChains, chainKey]);
        }
        setSelectedSourceChain(chainKey); // Set the selected source chain
      } catch (error) {
        console.error(`Error connecting to Keplr on ${chainKey}:`, error);
        alert('Error connecting to Keplr');
      }
    };
    const handleIbcTransfer = async () => {
      if (!window.keplr || !address) {
        alert('Please connect your Keplr wallet');
        return;
      }
  
      const chainInfo = chains[selectedSourceChain];
      try {
        await window.keplr.enable(chainInfo.chainId);
        const offlineSigner = window.getOfflineSignerAuto(chainInfo.chainId);
        const client = await SigningStargateClient.connectWithSigner(chainInfo.rpcEndpoint, offlineSigner);
  
        const amountFinal = {
          denom: 'uatom', // Make sure to use the correct denom for the source chain
          amount: String(amount), // The amount should be in the smallest unit of the token (e.g., uatom for ATOM)
        };
  
        const fee = {
          amount: [{ denom: 'uatom', amount: '5000' }], // Adjust fee based on current network conditions
          gas: '200000', // Adjust gas based on current network conditions
        };
  
        const memo = ''; // Optional memo for the transaction
        const result = await client.sendIbcTokens(
          address,
          destinationAddress,
          amountFinal,
          chainInfo.sourceChannel,
          'transfer', // This is the IBC port typically used for token transfers
          Date.now() + 10 * 60 * 1_000_000_000, // Timeout timestamp (10 minutes from now)
          fee,
          memo
        );
  
        console.log('IBC Transfer result:', result);
        alert('IBC Transfer successful!');
      } catch (error) {
        console.error('Error during IBC transfer:', error);
        alert('IBC Transfer failed');
      }
    };
  
    return (
        <div>
          <h2>IBC Transfer</h2>
          <div className="card">
            {Object.keys(chains).map((chainKey) => (
              <button key={chainKey} onClick={() => handleSelectChain(chainKey)}>
                Connect to {chainKey.charAt(0).toUpperCase() + chainKey.slice(1)}
              </button>
            ))}
          </div>
          {connectedChains.length > 0 && (
            <div className="card">
              <p>Connected Chains:</p>
              <ul>
                {connectedChains.map((chain) => (
                  <li key={chain}>{chains[chain].displayName || chain}</li>
                ))}
              </ul>
              <p>Connected to {selectedSourceChain}: {address}</p>
              <select onChange={(e) => setSelectedDestinationChain(e.target.value)} value={selectedDestinationChain}>
                {Object.keys(destinationChains).map((chainKey) => (
                  <option key={chainKey} value={chainKey}>
                    {destinationChains[chainKey].displayName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder={`Destination Address on ${destinationChains[selectedDestinationChain].displayName}`}
              />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <button onClick={handleIbcTransfer}>Transfer via IBC</button>
            </div>
          )}
          <style jsx>{`
            .card {
              background: #f9f9f9;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              padding: 20px;
              margin: 10px 0;
              display: flex;
              flex-direction: column;
            }
            button {
              margin-top: 10px;
            }
            input {
              margin: 5px 0;
            }
          `}</style>
        </div>
      );
    };
    
    export default IbcTransfer;