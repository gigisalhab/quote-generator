import React from 'react';
import './Footer.css'; 
import { ReactComponent as FacebookIcon } from './icons/Facebook.svg'; 
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
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
