import React from 'react';
import './Footer.css'; // Make sure to create this CSS file to style your footer
import { ReactComponent as FacebookIcon } from './icons/Facebook.svg'; // Import your icons accordingly
import { ReactComponent as TwitterIcon } from './icons/Twitter.svg';
import { ReactComponent as InstagramIcon } from './icons/Instagram.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="feedback-callout">
        <p>Feel free to give me feedback!</p>
      </div>
      <div className="contact-info">
        <div className="address">
          <strong>ADDRESS</strong>
          <p>123 Anywhere St., Any City ST 12345</p>
        </div>
        <div className="phone">
          <strong>PHONE</strong>
          <p>(123) 456-7890</p>
        </div>
        <div className="email">
          <strong>EMAIL</strong>
          <p>salhabje@msu.edu</p>
        </div>
        <div className="social">
          <strong>SOCIAL</strong>
          <div className="social-icons">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
