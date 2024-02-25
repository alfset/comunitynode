import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap'; 
import { DirectSecp256k1HdWallet, SigningStargateClient, coins } from '@cosmjs/stargate';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { assertIsBroadcastTxSuccess } from '@cosmjs/stargate';
import loadingGif from '../assets/animate1.gif';

const DelegateModal = ({ show, handleClose, handleDelegate, validatorAddress }) => {
  const [amount, setAmount] = useState('');

  const onSubmit = () => {
    handleDelegate(validatorAddress, amount);
    handleClose(); 
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delegate Tokens</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Staking Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to stake"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Delegate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};



const StakingPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [validators, setValidators] = useState([]);
  const [isLoadingValidators, setIsLoadingValidators] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentValidator, setCurrentValidator] = useState('');

  const connectOrDisconnectKeplr = async () => {
    if (walletAddress) {
      // If already connected, disconnect by clearing the wallet address
      setWalletAddress('');
      alert("Disconnected from Keplr wallet.");
      return;
    }

    // Attempt to connect if not already connected
    if (!window.keplr) {
      alert("Please install the Keplr extension.");
      return;
    }

    const chainId = "planq_7070-2"; // Replace with your actual chain ID
    try {
      await window.keplr.experimentalSuggestChain({
        // Chain configuration details
        chainId: chainId,
        chainName: "Planq",
        // Add other necessary details
      });

      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
    } catch (error) {
      console.error("Failed to connect to the Keplr wallet:", error);
      alert("Could not connect to the Keplr wallet. See console for details.");
    }
  };
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };


  useEffect(() => {
    fetchValidators();
  
  }, []);
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
  const formatValidatorAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
  };
  const handleDelegate = async (validatorAddress, amount) => {
    if (!window.keplr) {
      alert("Please install the Keplr extension.");
      return;
    }
  
    if (!walletAddress) {
      alert("Please connect your Keplr wallet first.");
      return;
    }
  
    const chainId = "planq_7070-2"; // Replace with your actual chain ID
  
    try {
      await window.keplr.enable(chainId);
      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
  
      const stargateClient = await SigningStargateClient.connectWithSigner(
        "https://rpc.planq.network", // This RPC endpoint should be replaced with the actual RPC endpoint of the Planq network
        offlineSigner
      );
  
      // Convert the amount to the base unit of the token
      const amountInBaseUnit = coins(amount, "aplanq"); // Replace "uplanq" with the denom of your token
  
      const fee = {
        amount: coins(5000, "aplanq"), // The fee associated with the transaction
        gas: "200000", // The gas limit
      };
  
      const result = await stargateClient.delegateTokens(
        walletAddress,
        validatorAddress,
        amountInBaseUnit,
        fee
      );
  
      assertIsBroadcastTxSuccess(result);
  
      alert("Delegation successful!");
    } catch (error) {
      console.error("Failed to delegate tokens:", error);
      alert("Delegation failed. See console for details.");
    }
  };

  const openModalOrConnectWallet = (validatorAddress) => {
    if (walletAddress) {

      setCurrentValidator(validatorAddress);
      setShowModal(true);
    } else {
      connectOrDisconnectKeplr();
    }
  };
  const closeModal = () => {
    setShowModal(false); // Hide the delegate modal
  };



  return (
    <div className="container mt-4">
      <h1>Staking Page</h1>
            
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Choose Your Trusted Validator Service</h2>
        <button variant="outline-secondary" size="sm" className="ml-2 p-0" style={{fontSize: '0.75rem', lineHeight: '1.5', height: 'auto', width: 'auto'}} onClick={connectOrDisconnectKeplr} className="btn btn-primary btn-sm">
          {walletAddress ? `Disconnect (${formatAddress(walletAddress)})` : "Connect to Keplr Wallet"}
        </button>
      </div>
      <p>Connect to Keplr Wallet to proceed with staking.</p>

      
      <DelegateModal
        show={showModal}
        handleClose={closeModal}
        handleDelegate={handleDelegate}
        validatorAddress={currentValidator}
      />

      <div className="mt-4">
        {isLoadingValidators ? (
          <div className="d-flex flex-column align-items-center">
            <img src={loadingGif} alt="Loading..." style={{ width: '250px', height: '250px' }} />
            <div className="mt-2" style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Loading All Validators</div>
          </div>
        ) : (
          <table className="table">
    <thead>
      <tr>
        <th scope="col">Moniker</th>
        <th scope="col">Address</th>
        <th scope="col">Staked Amount (PLQ)</th>
        <th scope="col">Security Contact</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {validators.map((validator, index) => (
        <tr key={index}>
          <td>{validator.description.moniker}</td>
          <td className="d-flex align-items-center">
                      {formatValidatorAddress(validator.operator_address)}
                      <CopyToClipboard text={validator.operator_address}>
                        <Button variant="outline-secondary" size="sm" className="ml-2 p-0" style={{fontSize: '0.75rem', lineHeight: '1.5', height: 'auto', width: 'auto'}}>Copy</Button>
                      </CopyToClipboard>
                    </td>
          <td>{validator.tokens / 1000000000000000000}</td>
          <td>{validator.description.security_contact || 'N/A'}</td>
          <td>
                  {walletAddress ? (
                    <button className="btn btn-success btn-sm" onClick={() => openModalOrConnectWallet(validator.operator_address)}>
                      Delegate
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => connectOrDisconnectKeplr()}>
                      Delegate
                    </button>
                  )}
                </td>
        </tr>
      ))}
    </tbody>
  </table>
        )}
      </div>
    </div>
  );
};

export default StakingPage;