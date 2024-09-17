import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import "./Home.css";
// @ts-ignore
import Header from "./Header.tsx";


const GreenMelbLandingPage: React.FC = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Home - Green Melb";
    }, []);
    const navigateToPage = (path: string) => {
        navigate(path);
    };

    return (
        <div className="landing-page">
          {/* <header/> */}
          <Header/>
          <section className="hero-section">
                <div className="hero-content">
                    <div></div>
                    <div></div>
                    <h1>Welcome to Green Melb</h1>
                    <p>Your guide to managing household waste! We help you reduce waste and make eco-friendly choices with simple tips and tools for recycling, food waste, and more. Start your journey to a greener home today!</p>
                    {/* <button onClick={() => navigateToPage('/get-started')}>
                        Get Started
                    </button> */}
                </div>
      
            </section>

            <section id="features" className="features-section">
                <h2>How We Can Help</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Identify Your Waste</h3>
                        <p>Find out if your waste is Recyclable, Organic or E-Waste</p>
                        <button onClick={() => navigateToPage('/identifyWaste')}>
                            Try it
                        </button>
                    </div>
                    <div className="feature-card">
                        <h3>Calculate Monthly Waste</h3>
                        <p>Monthly Estimation of Average's Person Waste.</p>
                        <button onClick={() => navigateToPage('/WastePrediction')}>
                            Find Out
                        </button>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <h2>About Green Melb</h2>
                <p>
                    At Green Melb, our mission is to empower the people of Melbourne to manage waste effectively and sustainably. Whether you're looking to reduce, reuse, or recycle, we're here to guide you every step of the way.
                </p>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
            </footer>
        </div>
    );
};

export default GreenMelbLandingPage;
