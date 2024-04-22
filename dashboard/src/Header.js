import React from 'react';
import './Header.css'; // Make sure to create this CSS file
import logo from './logo.png'; // Assuming logo.png is in the src folder
import image from './image.png'; // Add this line to import image.png

const Header = () => {
  return (
    <header className="header">
      <div className="logo-title-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="header-title">SOUL SPEAKS</h1>
      </div>
      <div className="header-slogan">
        <img src={image} alt="Find Your Words, Match Your Mood" className="slogan-image" />
      </div>
    </header>
  );
};

export default Header;
