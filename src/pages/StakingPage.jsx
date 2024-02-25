import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Dropdown, Table } from 'react-bootstrap';
import loadingGif from '../assets/animate1.gif';

const chains = [
  { id: 'cosmoshub-4', name: 'Cosmos Hub', apiUrl: 'https://cosmos-rest.publicnode.com', denom: 'ATOM', variant: 'primary'  },
  { id: 'osmosis-1', name: 'Osmosis', apiUrl: 'https://lcd.osmosis.zone', denom: 'OSMO', variant: 'success' },
  { id: 'akashnet-2', name: 'Akash Network', apiUrl: 'https://akash-api.polkachu.com', denom: 'AKT', variant: 'warning' },
  { id: 'planq_7070-2', name: 'Planq Network', apiUrl: 'https://rest.planq.network', denom: 'PLQ', variant: 'info' },
  { id: 'celestia', name: 'Celestia Network', apiUrl: 'https://api.lunaroasis.net', denom: 'TIA', variant: 'dark' },
];

const StakingPage = () => {
  const [selectedChain, setSelectedChain] = useState(chains[0].id);
  const [validators, setValidators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDelegationModal, setShowDelegationModal] = useState(false);
  const [delegationAmount, setDelegationAmount] = useState('');
  const [selectedValidator, setSelectedValidator] = useState('');

  useEffect(() => {
    const chain = chains.find(chain => chain.id === selectedChain);
    if (chain) {
      fetchValidators(chain.apiUrl);
    }
  }, [selectedChain]);
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
    } catch (error) {
      console.error('Failed to connect to Keplr wallet:', error);
      alert('Could not connect to the Keplr wallet. See console for details.');
    }
  };
  const [walletAddress, setWalletAddress] = useState('');


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


  const formatStakedAmount = (tokens) => {
    const chain = chains.find(chain => chain.id === selectedChain);
    if (chain.id === 'planq_7070-2') {     
      const convertedTokens = tokens / 1000000000000000000;
      return `${convertedTokens} ${chain.denom}`;
    } else {
      return `${tokens} ${chain.denom}`;
    }
  };

  const handleDelegate = (validatorId) => {
    if (!walletConnected) {
      connectKeplrWallet();
      return;
    }
    console.log(`Delegating to validator: ${validatorId}`);
    // Implement delegation logic here
  };

  return (
    <div className="container mt-4">
      <h1>Staking Page</h1>
      <Button variant="outline-secondary" size="sm" className="ml-2 p-0" style={{fontSize: '0.75rem', lineHeight: '1.5', height: 'auto', width: 'auto'}} onClick={connectKeplrWallet} className="mb-3">
  {walletConnected ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Keplr Wallet'}
</Button>
<Dropdown className="mb-4">
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
      <div>
        <h2>Validators</h2>
        {isLoading ? (
          <div className="d-flex flex-column align-items-center">
          <img src={loadingGif} alt="Loading..." style={{ width: '250px', height: '250px' }} />
          <div className="mt-2" style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Loading All Validators</div>
        </div>
      ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
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
        ) : (
          'No image'
        )}
      </td>
      <td>{validator.moniker}</td>
      <td>{validator.id}</td>
      <td>{formatStakedAmount(validator.tokens)}</td>
      <td>
        <Button variant="success" size="sm" onClick={() => handleDelegate(validator.id)}>
          Delegate
        </Button>
      </td>
    </tr>
  ))}
</tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StakingPage;
