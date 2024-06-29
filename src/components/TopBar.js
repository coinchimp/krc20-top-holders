// src/components/TopBar.js
import React from 'react';
import { FaDiscord, FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import './TopBar.css';
import nachoLogo from './kaspa_logo_nacho.png'; // Adjust the path to the actual location of the image


const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">
        <img src={nachoLogo} alt="Nacho Logo" className="nacho-logo" />
        <h2>Nacho the 𐤊at</h2>
      </div>
      <div className="whitepaper-box" >
      &nbsp;&nbsp;
        <a href="/Nacho_the_at_Whitepaper_Draft_2.pdf" className="whitepaper-link" target="_blank" rel="noopener noreferrer">
              [whitepaper]
        </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div className="social-links">
        <a href="https://discord.gg/EB8VvA9DVf" target="_blank" rel="noopener noreferrer">
          <FaDiscord />
        </a>
        <a href="https://t.me/nachothecat" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane />
        </a>
        <a href="https://x.com/NachoWyborski" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
