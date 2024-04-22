import React from 'react';
import './Header.css'; 
import logo from './logo.png'; 
import image from './image.png';


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
