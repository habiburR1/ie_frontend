import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import styles from './styles.module.css'; 
import CompostRatioCalculator from './CompostRatioCalculator.tsx';
import Header from './Header.tsx';

export default function CompostingTips() {
  const alignCenter = { display: 'flex', alignItems: 'center' };
  const [showButton, setShowButton] = useState(false); // To track when to show the button
  const navigate = useNavigate(); // To navigate to the Plant Recommendation page

  // Function to handle scroll and show the button when the user reaches the bottom
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= documentHeight - 50) { // Check if the user scrolled near the bottom
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    document.title = "Composte Guide - Green Melb";
}, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle button click and navigate to Plant Recommendation page
  const goToPlantRecommendation = () => {
    navigate('/PlantRecommendation'); // Adjust the path as needed
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.background} />

      <div className={styles.contentWrapper}>
        <Parallax pages={5}>
          <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
            <p className={styles.scrollText}>
              Composting is a fantastic way to manage organic waste produced at home and create valuable compost for your garden. 
              This guide will walk you through the steps to set up a compost bin, select materials, and maintain your compost effectively.
            </p>
          </ParallaxLayer>

          <ParallaxLayer sticky={{ start: 1, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
            <div className={`${styles.card} ${styles.sticky}`}>
              <p>Step 1: Set up bin</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
              <p>Choose a shaded spot with drainage.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
              <p>Use a bin or make one with pallets or mesh.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Start with a layer of twigs or straw.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Ensure good airflow for faster composting.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer sticky={{ start: 2.25, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
            <div className={`${styles.card} ${styles.sticky2}`}>
              <p>Step 2: Add Materials</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
              <p>Alternate layers of greens (food scraps) and browns (dry leaves).</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
              <p>Maintain a 2:1 ratio of browns to greens.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Chop materials for quicker breakdown.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Avoid meat, dairy, or oily foods.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer sticky={{ start: 3.25, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
            <div className={`${styles.card} ${styles.sticky3}`}>
              <p>Step 3: Maintain & Use</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
              <p>Turn the pile weekly for aeration.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={3.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
              <p>Keep the compost moist but not soggy.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={3.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Add water or browns as needed for balance.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={3.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
            <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
              <p>Compost is ready when dark and crumbly.</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={4} speed={1.75} style={{ ...alignCenter, justifyContent: 'center' }}>
            <CompostRatioCalculator />  {/* Calculator component */}
          </ParallaxLayer>

          {/* Adjusted Text and Button for Plant Recommendation */}
          <ParallaxLayer offset={4.3} speed={1} style={{ ...alignCenter, justifyContent: 'center' }}>
              <button className={styles.scrollButton} onClick={goToPlantRecommendation}>
                Go to Plant Recommendation
              </button>
          </ParallaxLayer>
        </Parallax>
      </div>
    </div>
  );
}
