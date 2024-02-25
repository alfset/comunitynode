import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your HomePage component
import StakingPage from './pages/StakingPage'; // Import your StakingPage component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staking" element={<StakingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
