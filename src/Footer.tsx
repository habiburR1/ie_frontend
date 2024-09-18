import React from "react";
import './Footer.css';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Green Melb. All rights reserved.</p>
                <nav>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </nav>
    </footer>
  );
};

export default Footer;
