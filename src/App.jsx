import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import StakingPage from './pages/StakingPage'; 
import Blogs from './pages/Blogs';
import Ibc from './pages/Ibc';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/transfer" element={<Ibc />} />
      </Routes>
    </Router>
  );
};

export default App;
