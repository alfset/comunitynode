import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CaseStudies, Footer, Hero, Process, Services, Team, CTA } from './container';
import { Menu } from './components';
import Loading from './Loading'; // Import the loading component

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time with setTimeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <Menu />
          <Hero />
          <Services />
          <CTA />
          <CaseStudies />
          <Process />
          <Team />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
