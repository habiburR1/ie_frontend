import React from "react";
import Header from "./Header.tsx";
import './NoPage.css';

const NoPage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1 className ="header">Oh trash! </h1>
      <p className ="text">Looks like you are in the wrong bin </p>
      <p className ="text">ERROR 404 PAGE NOT FOUND </p>
      <img src="./images/trash.png" alt="Trash" />

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

export default NoPage;
