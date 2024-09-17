import React, { useRef } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Achievements.css';
import styles from './styles.module.css'; 
import IdentifyWaste from './IdentifyWaste.tsx';
import Header from './Header.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Define your image URLs
const images = {
  background: "/images/background.jpuyG", //change later to jpg
  pizza: "/images/pizza.png",
  bottle: "/images/bottle.png",
  battery: "/images/battery.png",
  banana: "/images/banana.png",
  can: "/images/can.png",
  bash: "/images/plasticbag.png",
  pizza1: "/images/pizza.png",
  landfill: "/images/file.jpg",
  sky: "/images/sky.jpg",
}

export default function App() {
  const navigate = useNavigate(); // Use navigate for navigation
  const parallax = useRef<IParallax>(null!);

  const handleClick = () => {
    navigate('/IdentifyWaste'); // Navigate to the home route
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
      <Header/>
      <Parallax ref={parallax} pages={5}>
        {/* Background layers */}
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        {/* Custom background image */}
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={5}
          style={{
            backgroundImage: `url(${images.sky})`, // Use the custom background image URL
            backgroundSize: 'cover',
          }}
        />
        
        {/* Custom satellite image */}
        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={images.pizza} style={{ width: '15%', marginLeft: '70%' }} />
          <img src={images.bash} style={{ display: 'block', width: '5%', marginLeft: '25%' }} />
          <img src={images.can} style={{ display: 'block', width: '5%', marginLeft: '5%' }} />
          <p></p>
        </ParallaxLayer>
        
        {/* Custom cloud images */}
        <ParallaxLayer offset={1} speed={-0.8} style={{ opacity: 0.9 }}>
          <img src={images.pizza} style={{ display: 'block', width: '20%', marginLeft: '75%' }} className="rotate-15" />
          <img src={images.battery} style={{ display: 'block', width: '10%', marginLeft: '15%' }} className="rotate-45" />
          <img src={images.bash} style={{ display: 'block', width: '5%', marginLeft: '25%' }} />
          <img src={images.banana} style={{ display: 'block', width: '5%', marginLeft: '5%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={-0.5} style={{ opacity: 0.1 }}>
          <img src={images.bottle} style={{ display: 'block', width: '20%', marginLeft: '70%' }} className="rotate-negative-25"/>
          <img src={images.battery} style={{ display: 'block', width: '10%', marginLeft: '40%' }} className="rotate-75" />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={-0.2} style={{ opacity: 0.2 }}>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '10%' }} className="rotate-75"/>
          <img src={images.battery} style={{ display: 'block', width: '15%', marginLeft: '75%' }} className="rotate-negative-10"/>
          <img src={images.bash} style={{ display: 'block', width: '15%', marginLeft: '85%' }} className="rotate-45"/>
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.8 }}>
          <img src={images.bottle} style={{ display: 'block', width: '20%', marginLeft: '60%' }} className="rotate-75"/>
          <img src={images.battery} style={{ display: 'block', width: '5%', marginLeft: '30%' }} className="rotate-220"/>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '80%' }} className="rotate-125"/>
          <img src={images.can} style={{ display: 'block', width: '20%', marginLeft: '80%' }}  className="rotate-45"/>
          <img src={images.banana} style={{ display: 'block', width: '20%', marginLeft: '5%' }}  className="rotate-45"/>
          <img src={images.banana} style={{ display: 'block', width: '30%', marginLeft: '95%' }}  className="rotate-45"/>
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={-0.4} style={{ opacity: 0.6 }}>
          <img src={images.pizza} style={{ display: 'block', width: '15%', marginLeft: '10%' }}className="rotate-negative-10"/>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '5%' }} className="rotate-15"/>
          <img src={images.pizza} style={{ display: 'block', width: '15%', marginLeft: '75%' }}className="rotate-negative-10"/>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.3}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={images.banana}
            style={{
              width: '20%',
              transform: 'rotate(75deg)', 
              transformOrigin: 'center center', 
            }}
          />
        </ParallaxLayer>

        {/* Clients background image */}
        <ParallaxLayer
          offset={2.2}
          speed={-0.3}
          style={{
            backgroundSize: '20%',
            backgroundPosition: 'center',
            backgroundImage: `url(${images.can})`, // Use the custom clients background image URL
          }}
        />

        <div className={styles.headerContainer}>
          <h1 className={`${styles.headerSize} ${styles.header1} `}>Green Melb</h1>
          <p className={`${styles.header1Text} ${styles.headerSize}`}> Fixing Melbourne's waste problem. Right from your home</p>
          <p className="scrollText"> Scroll to learn more</p>
        </div>

        <ParallaxLayer sticky={{ start: 1.25, end: 3.75 }} speed={2}>
          <div className={styles.headerContainer}>
            <h1 className={`${styles.header2} ${styles.headerSize}`}>Melbourne</h1>
          </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 1.25, end: 1.5}} speed={4}>
          <div className={styles.headerContainer}>
            <h1 className={`${styles.MelbText} ${styles.scrollHeader1}`}>#4 most liveable city</h1>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 2, end: 2.25}} speed={4}>
          <div >
            <h1 className={`${styles.MelbText} ${styles.scrollHeader1}`}>Population: 5.207 million</h1>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 2.75, end: 3}} speed={4}>
          <div>
            <h1 className={`${styles.MelbText} ${styles.scrollHeader2}`}>3.3 million tonnes of waste</h1>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 3.5, end: 3.75 }} speed={4}>
          <div >
            <h1 className={`${styles.MelbText} ${styles.scrollHeader3}`}>75% ends up in landfills</h1>
          </div>
        </ParallaxLayer>

        <div className={styles.headerContainer}>
          <h1 className={`${styles.header3} ${styles.headerSize1}`}> </h1>
        </div>

        <div className={styles.headerContainer}>
          <h1 className={`${styles.header4} ${styles.headerSize2}`}>Be a part of the solution today </h1>
          <button onClick={handleClick} className="my-button">Click to get started</button> 
        </div>
      </Parallax>
    </div>
  );
}
