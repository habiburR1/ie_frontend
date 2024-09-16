import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import './styles.css'; // Custom styles

const Test: React.FC = () => {
  return (
    <div>
      <Parallax pages={3}>
        {/* Background Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          style={{
            backgroundImage: 'url(/path-to-your-background-image.jpg)',
            backgroundSize: 'cover',
          }}
        />

        {/* Layer with Text */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '2em',
          }}
        >
          <div>Welcome to Our Site</div>
        </ParallaxLayer>

        {/* Another Layer with More Content */}
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '1.5em',
          }}
        >
          <div>Explore More Content Here</div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Test;
