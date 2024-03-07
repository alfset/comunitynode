import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [proposals, setProposals] = useState([]);
  const [comments, setComments] = useState({}); // Stores comments by proposal ID
  const [commentInputs, setCommentInputs] = useState({}); // Stores current comment input by proposal ID
  const [selectedChain, setSelectedChain] = useState('cosmos'); // Default selection

  const endpoints = {
    cosmos: 'https://cosmos-rest.publicnode.com/cosmos/gov/v1beta1/proposals',
    planq: 'https://rest.planq.network/cosmos/gov/v1beta1/proposals',
    oraichain: 'https://rest.cosmos.directory/oraichain/cosmos/gov/v1beta1/proposals',
    celestia: 'https://api.celestia.network/cosmos/gov/v1beta1/proposals',
    osmosis: 'https://api.osmosis.zone/cosmos/gov/v1beta1/proposals',
    akash: 'https://akash-api.polkachu.com/cosmos/gov/v1beta1/proposals',
  };

  const fetchGovernanceProposalsFromChain = async () => {
    try {
      const response = await axios.get(endpoints[selectedChain]);
      if (response.data && response.data.proposals) {
        const activeProposals = response.data.proposals.filter(proposal => proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD");
        setProposals(activeProposals);
      }
    } catch (error) {
      console.error(`Error fetching governance proposals from ${selectedChain}:`, error);
      setProposals([]);
    }
  };

  useEffect(() => {
    fetchGovernanceProposalsFromChain();
  }, [selectedChain]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleChainChange = (event) => {
    setSelectedChain(event.target.value);
  };

  const handleCommentInputChange = (proposalId, value) => {
    setCommentInputs({
      ...commentInputs,
      [proposalId]: value,
    });
  };

  const handleCommentSubmit = (proposalId) => {
    const newComments = {
      ...comments,
      [proposalId]: [...(comments[proposalId] || []), commentInputs[proposalId]],
    };
    setComments(newComments);
    // Clear the specific input field after submitting a comment
    setCommentInputs({
      ...commentInputs,
      [proposalId]: '',
    });
  };

  return (
    <div>
      <h2>Governance Proposals</h2>
      <div>
        <select onChange={handleChainChange} value={selectedChain}>
          <option value="cosmos">Cosmos</option>
          <option value="planq">PlanQ</option>
          <option value="oraichain">Oraichain</option>
          <option value="celestia">Celestia</option>
          <option value="osmosis">Osmosis</option>
          <option value="akash">Akash Network</option>
        </select>
      </div>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map((proposal, index) => (
            <li key={index}>
              <h3>{proposal.content.title}</h3>
              <p>{proposal.content.description}</p>
              <input
                type="text"
                value={commentInputs[proposal.proposal_id] || ''}
                onChange={(e) => handleCommentInputChange(proposal.proposal_id, e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => handleCommentSubmit(proposal.proposal_id)}>Submit Comment</button>
              <ul>
                {comments[proposal.proposal_id] && comments[proposal.proposal_id].map((comment, idx) => (
                  <li key={idx}>{comment}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active proposals found for {selectedChain}.</p>
      )}
    </div>
  );
};

export default Blogs;
