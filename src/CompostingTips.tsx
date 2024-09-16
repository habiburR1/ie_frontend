import * as React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './styles.module.css'; 
import CompostRatioCalculator from './CompostRatioCalculator.tsx';
import Header from './Header.tsx';

export default function CompostingTips() {
  const alignCenter = { display: 'flex', alignItems: 'center' };
  
  return (
    <div>
      <Header />
      <div className={styles.background} />

      <Parallax pages={5}>
        <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
          <p className={styles.scrollText}>Composting is a fantastic way to manage organic waste produced at home and create valuable compost for your garden. This guide will walk you through the steps to set up a compost bin, select materials, and maintain your compost effectively.</p>
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
          <p>Use a bin or make one with pallets or mesh.
          </p>
           </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Start with a layer of twigs or straw.
            </p>
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
            <p>Avoid meat, dairy, or oily foods.
            </p>
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
        
      </Parallax>
      <footer className="footer">
                <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                    
                </nav>
            </footer>
    </div>
  );
}
