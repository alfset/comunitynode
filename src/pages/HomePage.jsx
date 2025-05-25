import React, { useState, useEffect } from 'react';
import { CaseStudies, Footer, Hero, Process, Services, Team, CTA, Dapps } from '../container';
import { Menu } from '../components';
import Loading from '../Loading';
import { motion } from 'framer-motion';
import './HomePage.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="homepage-wrapper">
          <Menu />
          <main className="homepage-content">
            {[Hero, Services, CTA, CaseStudies, Process, Dapps, Team, Footer].map((Component, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Component />
              </motion.div>
            ))}
          </main>
        </div>
      )}
    </>
  );
};

export default HomePage;
