import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Optional for smooth animations

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Show the button when the user scrolls down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }} // Optional hover effect
          whileTap={{ scale: 0.9 }}   // Optional tap effect
          style={buttonStyle}
        >
          ⬆ Back to Top
        </motion.button>
      )}
    </>
  );
};

// Basic styling for the button
const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '50px',
  cursor: 'pointer',
  fontSize: '16px',
  zIndex: 1000, // Ensures it is on top
};

export default BackToTop;
