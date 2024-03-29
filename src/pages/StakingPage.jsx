import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Dropdown, Table, Card, Row, Col } from 'react-bootstrap';
import loadingGif from '../assets/animate1.gif';
import { StargateClient, SigningStargateClient, coins, QueryClient } from '@cosmjs/stargate';
import { BigNumber } from 'bignumber.js';

const chains = [
  { id: 'cosmoshub-4', name: 'Cosmos Hub', apiUrl: 'https://cosmos-rest.publicnode.com', denom: 'uatom', variant: 'primary'  },
  { id: 'osmosis-1', name: 'Osmosis', apiUrl: 'https://lcd.osmosis.zone', denom: 'uosmo', variant: 'success' },
  { id: 'akashnet-2', name: 'Akash Network', apiUrl: 'https://akash-api.polkachu.com', denom: 'uakt', variant: 'warning' },
  { id: 'planq_7070-2', name: 'Planq Network', apiUrl: 'https://rest.planq.network', denom: 'aplanq', variant: 'info' },
  { id: 'celestia', name: 'Celestia Network', apiUrl: 'https://api.lunaroasis.net', denom: 'utia', variant: 'dark' },
  { id: 'oraichain', name: 'oraichain Network', apiUrl: 'https://rest.cosmos.directory/oraichain', denom: 'orai', variant: 'success' },
  { id: 'cataclysm-1', name: 'Nibiru', apiUrl: 'https://nibiru-api.polkachu.com', denom: 'unibi', variant: 'danger' },
];
const formatBalance = (balance, denom) => {
  const conversionFactors = {
    'uatom': 1e6, // Micro units for Cosmos Hub
    'uosmo': 1e6, // Micro units for Osmosis
    'uakt': 1e6, // Micro units for Akash Network
    'aplanq': 1e18, // For Planq Network
    'utia': 1e6,
    'unibi': 1e6,
    'orai': 1e6,// Micro units for Celestia Network
  };
  const denomDisplayNames = {
    'uatom': 'ATOM',
    'uosmo': 'OSMO', // Display name for Osmosis
    'uakt': 'AKT',
    'aplanq': 'PLQ',
    'unibi': 'NIBI',
    'utia': 'TIA',
    'orai': 'Orai',
  };

  const conversionFactor = conversionFactors[denom] || 1e6;
  const numericBalance = new BigNumber(balance);
  const formattedBalance = numericBalance.dividedBy(conversionFactor);
  const displayName = denomDisplayNames[denom] || denom.toUpperCase().replace(/^U/, ''); // Use display name if available

  return `${formattedBalance.toFixed()} ${displayName}`;
};

const DelegateModal = ({ show, onHide, onDelegate, validatorId, amount, setAmount }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delegate Stake</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Amount to Delegate</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => onDelegate(validatorId, amount)}>Delegate</Button>
      </Modal.Footer>
    </Modal>
  );
};

const StakingPage = () => {
  const [selectedChain, setSelectedChain] = useState(chains[0].id);
  const [validators, setValidators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDelegationModal, setShowDelegationModal] = useState(false);
  const [delegationAmount, setDelegationAmount] = useState('');
  const [currentValidatorId, setCurrentValidatorId] = useState(null);
  const [totalStaked, setTotalStaked] = useState(1987291898366487); // Added for total staked amount
  const [apr, setApr] = useState(0); // Added for APR
  const [lastBlock, setLastBlock] = useState('');
  const [balance, setBalance] = useState(0); // Added state for balance
  const [lastPrice, setLastPrice] = useState('');
  const [usdPrice, setUsdPrice] = useState(0);

  const fetchLastPrice = async (chainId) => {
    // Mapping of chain ID to CoinGecko cryptocurrency ID
    const chainToCoinId = {
      'cosmoshub-4': 'cosmos',
      'osmosis-1': 'osmosis',
      'akashnet-2': 'akash-network',
      'planq_7070-2': 'planq',
      'celestia': 'celestia-network ',
      'Oraichain': 'oraichain',
      'cataclysm-1': 'nibiru'
      // Add other mappings as needed
    };
    const coinId = chainToCoinId[chainId];
    if (!coinId) {
      console.error('CoinGecko ID not found for chain:', chainId);
      return;
    }

    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data[coinId] && data[coinId].usd) {
        setUsdPrice(data[coinId].usd);
      }
    } catch (error) {
      console.error('Error fetching last price from CoinGecko:', error);
    }
  };

  // Function to convert balance/staked amount to USD
  const toUsd = (amount, denom) => {
    const conversionFactor = {
      'uatom': 1e6,
      'uosmo': 1e6,
      'uakt': 1e6,
      'aplanq': 1e18,
      'utia': 1e6,
      'unibi': 1e6,
    }[denom] || 1;
    return ((amount / conversionFactor) * usdPrice).toFixed(2);
  };


  
  useEffect(() => {
    const chain = chains.find(chain => chain.id === selectedChain);
    if (chain) {
      fetchValidators(chain.apiUrl);
      fetchLastPrice(selectedChain);
    }
  }, [selectedChain]);
  const [walletAddress, setWalletAddress] = useState('');
  const connectKeplrWallet = async () => {
    if (!window.keplr) {
      alert('Please install the Keplr extension.');
      return;
    }
  
    try {
      await window.keplr.enable(selectedChain);
      const offlineSigner = window.getOfflineSigner(selectedChain);
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address); // Store the wallet address in state
      setWalletConnected(true);
      // Call fetchBalance here to update the balance as soon as the wallet connects
      fetchBalance();
    } catch (error) {
      console.error('Failed to connect to Keplr wallet:', error);
      alert('Could not connect to the Keplr wallet. See console for details.');
    }
  };
  const fetchTotalStakedAmount = async (walletAddress, chainId) => {
    const chain = chains.find((chain) => chain.id === chainId);
    if (!chain) {
      console.error('Chain not found');
      return;
    }
    
    const stakingUrl = `${chain.apiUrl}/cosmos/staking/v1beta1/delegations/${walletAddress}`;
    
    try {
      const response = await fetch(stakingUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch staking information');
      }
      
      const data = await response.json();
      let totalStaked = 0;
      if (data && data.delegation_responses) {
        totalStaked = data.delegation_responses.reduce((sum, { balance }) => {
          return sum + parseInt(balance.amount, 10);
        }, 0);
      }
      
      setTotalStaked(totalStaked.toString()); // Update total staked state
    } catch (error) {
      console.error('Error fetching total staked amount:', error);
    }
  };

  const formatStakedAmount = (tokens) => {
    const chain = chains.find(chain => chain.id === selectedChain);
    if (chain.id === 'planq_7070-2') {     
      const convertedTokens = tokens / 1000000000000000000;
      return `${convertedTokens} ${chain.denom}`;
    } else {
      return `${tokens} ${chain.denom}`;
    }
  };

  const handleDelegate = async (validatorId, amount) => {
    if (!walletConnected) {
      console.log("Wallet is not connected.");
      return;
    }
  
    try {
      // Assuming 'selectedChain' state holds the ID of the current chain selected by the user
      const chain = chains.find(c => c.id === selectedChain);
      if (!chain) {
        console.error("Chain configuration not found.");
        return;
      }
  
      // Enabling Keplr for the selected chain
      await window.keplr.enable(chain.id);
  
      // Getting offline signer for the chain from Keplr
      const offlineSigner = window.getOfflineSigner(chain.id);
  
      // Getting accounts from the signer
      const accounts = await offlineSigner.getAccounts();
  
      // Creating a SigningStargateClient
      const client = await SigningStargateClient.connectWithSigner(chain.apiUrl, offlineSigner);
  
      // Preparing the amount in the correct format and denomination
      // 'amount' should be a string representing the amount in the smallest unit of the token (e.g., uatom for ATOM)
      const amountToDelegate = coins(Number(amount), chain.denom);
  
      // Delegating tokens
      // 'validatorId' should be the address of the validator
      const fee = { amount: coins(5000, chain.denom), gas: "200000" }; // Adjust the fee as necessary
      const result = await client.delegateTokens(accounts[0].address, validatorId, amountToDelegate, fee);
  
      console.log("Delegation result:", result);
      alert("Delegation successful!");
  
      // Closing the delegation modal after successful transaction
      setShowDelegationModal(false);
    } catch (error) {
      console.error("Delegation error:", error);
      alert("Delegation failed. Check console for details.");
    }
  };


  const fetchLastBlock = async (apiUrl) => {
    try {
      const response = await fetch(`${apiUrl}/blocks/latest`);
      if (!response.ok) {
        throw new Error('Failed to fetch last block information');
      }
      const data = await response.json();
      // Assuming the block height is located at data.block.header.height
      setLastBlock(data.block.header.height);
    } catch (error) {
      console.error('Error fetching last block:', error);
    }
  };

  const fetchBalance = async () => {
    if (!walletConnected || !walletAddress) {
      console.log("Wallet not connected or wallet address is missing.");
      return;
    }
  
    const chain = chains.find(c => c.id === selectedChain);
    if (!chain) {
      console.error("Chain configuration not found.");
      return;
    }
  
    console.log(`Fetching balance for address ${walletAddress} on chain ${chain.name}`);
  
    // Construct the URL to fetch the balance for the given wallet address
    // This is a generic pattern, you'll need to adjust it based on the actual API endpoint and parameters
    // required by the blockchain you're interacting with.
    const balanceUrl = `${chain.apiUrl}/cosmos/bank/v1beta1/balances/${walletAddress}`;
  
    try {
      const response = await fetch(balanceUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch balance. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
  
      // Assuming the API returns a response where balance information can be accessed like this
      // Adjust the path according to the actual response structure
      const balance = data.balances.find(balance => balance.denom === chain.denom)?.amount || '0';
      console.log(`Fetched balance: ${balance}`);
      setBalance(balance);
    } catch (error) {
      console.error("Failed to fetch balance. Error details:", error);
    }
  };

  const fetchValidators = async (apiUrl) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const validatorsWithImages = await Promise.all(
        data.validators.map(async (validator) => {
          const imageUrl = await fetchValidatorImage(validator.description.identity);
          return {
            id: validator.operator_address,
            moniker: validator.description.moniker,
            tokens: validator.tokens,
            imageUrl,
          };
        })
      );
      setValidators(validatorsWithImages);
    } catch (error) {
      console.error('Failed to fetch validators:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchValidatorImage = async (identity) => {
    try {
      const response = await fetch(`https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`);
      if (!response.ok) {
        throw new Error('Failed to fetch from Keybase');
      }
      const data = await response.json();
      if (data.them.length > 0 && data.them[0].pictures && data.them[0].pictures.primary) {
        return data.them[0].pictures.primary.url;
      }
      return '';
    } catch (error) {
      console.error('Failed to fetch image from Keybase:', error);
      return ''; 
    }
  };
  
  // Use useEffect to call fetchBalance when selectedChain or walletAddress changes
  useEffect(() => {
    const chain = chains.find(chain => chain.id === selectedChain);
    if (chain) {
      fetchValidators(chain.apiUrl);
      if (walletConnected && walletAddress) {
        fetchTotalStakedAmount(walletAddress, selectedChain);
        fetchBalance();
        fetchLastBlock();
        fetchLastPrice(selectedChain);
      }
    }
  }, [selectedChain, walletConnected, walletAddress]);
  useEffect(() => {
    const fetchLastPrice = async () => {
      const chainToCoinId = {
        'cosmoshub-4': 'cosmos',
        'osmosis-1': 'osmosis',
        'akashnet-2': 'akash-network',
        'planq_7070-2': 'planq',
        'celestia': 'celestia', // Make sure these IDs are correct
      };

      const chainId = chains.find(chain => chain.id === selectedChain)?.id;
      const coinId = chainToCoinId[chainId];
      if (!coinId) {
        console.error('CoinGecko ID not found for chain:', chainId);
        return;
      }
      
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data[coinId] && data[coinId].usd) {
          setLastPrice(data[coinId].usd.toString());
        }
      } catch (error) {
        console.error('Error fetching last price from CoinGecko:', error);
      }
    };

    // Call fetchLastPrice only if selectedChain is valid
    if (selectedChain) {
      fetchLastPrice();
    }
  }, [selectedChain]);
  const handleDelegateClick = (validatorId) => {
    if (!walletConnected) {
      connectKeplrWallet();
    } else {
      setCurrentValidatorId(validatorId); 
      setShowDelegationModal(true);
    }
  };
  
  const hideDelegateModal = () => setShowDelegationModal(false);

  return (
    <div className="container mt-4">
    <Row className="align-items-center mb-4">
      <Col>
      </Col>
      <Col xs={12} md={2} className="ml-auto"> {/* Adjust grid columns as needed */}
        <Card>
          <Card.Body>
            <Card.Title>Last Block</Card.Title>
              <Card.Text>{lastBlock}</Card.Text>
          </Card.Body> 
        </Card>  
      </Col>
      <Col xs={12} md={2} className="ml-auto"> {/* Adjust grid columns as needed */}
      <Card>
          <Card.Body>
            <Card.Title>Last Price</Card.Title>
            <Card.Text>${lastPrice} USD</Card.Text> {/* Display last price fetched from CoinGecko */}
          </Card.Body>
        </Card>
      </Col>
      <Col>
      <Dropdown className="mb-2">
        <Dropdown.Toggle 
          variant={chains.find(chain => chain.id === selectedChain)?.variant || 'secondary'} 
          size="sm" 
          className="ml-2 p-0" 
          style={{fontSize: '1rem', lineHeight: '2', height: 'auto', width: 'auto'}}
        >
          {chains.find(chain => chain.id === selectedChain).name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {chains.map(chain => (
            <Dropdown.Item key={chain.id} onClick={() => setSelectedChain(chain.id)}>
              {chain.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
</Col>
<Col>
    <Button variant="outline-secondary" size="md" className="ml-2 p-0" style={{ fontSize: '1rem', lineHeight: '1.5', height: 'auto', width: 'auto' }} onClick={connectKeplrWallet}>
      {walletConnected ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Keplr Wallet'}
    </Button>
  </Col>
</Row>
<h1>Staking Page</h1>
      <div>

{/* New Portfolio Section */}
<Row className="mt-3">
        <Col xs={12}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Total Staked</Card.Title>
              <Card.Text>
                {`${formatBalance(totalStaked, chains.find(chain => chain.id === selectedChain)?.denom)} 
                / $${toUsd(totalStaked, chains.find(chain => chain.id === selectedChain)?.denom)}`}
              </Card.Text>
              <Card.Text>
                <strong>Balance:</strong> 
                {`${formatBalance(balance, chains.find(chain => chain.id === selectedChain)?.denom)} 
                / $${toUsd(balance, chains.find(chain => chain.id === selectedChain)?.denom)}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        <h2>Validators</h2>
        {isLoading ? (
          <div className="d-flex flex-column align-items-center">
            <img src={loadingGif} alt="Loading..." style={{ width: '250px', height: '250px' }} />
            <div className="mt-1" style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Loading All Validators</div>
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>iD</th>
                  <th>Moniker</th>
                  <th>Validator Address</th>
                  <th>Staked Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {validators.map((validator) => (
                  <tr key={validator.id}>
                    <td>
                      {validator.imageUrl ? (
                        <img src={validator.imageUrl} alt={validator.moniker} style={{ width: '50px', height: '50px' }} />
                      ) : 'No image'}
                    </td>
                    <td>{validator.moniker}</td>
                    <td>{validator.id}</td>
                    <td>{formatStakedAmount(validator.tokens)}</td>
                    <td>
                      <Button variant="success" size="sm" onClick={() => handleDelegateClick(validator.id)}>
                        Delegate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <DelegateModal
              show={showDelegationModal}
              onHide={() => setShowDelegationModal(false)}
              onDelegate={(validatorId, amount) => handleDelegate(validatorId, amount)}
              validatorId={currentValidatorId}
              amount={delegationAmount}
              setAmount={setDelegationAmount}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StakingPage;
