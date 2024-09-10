import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
// @ts-ignore
import Header from "./Header.tsx";


const GreenMelbLandingPage: React.FC = () => {
    const navigate = useNavigate();

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
                    <p>Your trusted guide to waste management at HOME! We're here to help you make sense of HOUSEHOLD waste, reduce what you throw away, and make eco-friendly decisions. Whether you're sorting your recyclables, tackling food waste, or curious about the impact of your habits, our platform offers easy-to-follow tips and tools to help you identify and manage different types of waste. Start your journey towards a cleaner, greener HOME today!</p>
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
                        <p>Not sure what goes where? Start by identifying the type of waste you have.</p>
                        <button onClick={() => navigateToPage('/identifyWaste')}>
                            Learn More
                        </button>
                    </div>
                    <div className="feature-card">
                        <h3>Find a Local Recycling Center</h3>
                        <p>Locate the nearest recycling center to dispose of your waste responsibly.</p>
                        <button onClick={() => navigateToPage('/MapPage')}>
                            Learn More
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
