import React from "react";
import { Link } from "react-router-dom";
import "./GlobalStyles.css"; // Assuming this file exists for global styles
import "./Header.css"; // New CSS file for header styles

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">Green Melb</Link> {/* Make the logo clickable */}
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/IdentifyWaste">Identify waste</Link>
          </li>
          <li>
            <Link to="/MapPage">Recycling centers</Link>
          </li>
          <li>
            <Link to="/CompostingGuide">Composting Guide</Link>
          </li>
          <li>
            <Link to="/Recyclable">Recyclable</Link>
          </li>
          <li>
            <Link to="/achievements">Your achievements</Link>
          </li>
          <li>
            <Link to="/PlantRecommendation">Plant Recommendation</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
