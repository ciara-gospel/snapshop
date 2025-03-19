import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Fichier CSS pour le style

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="home-page">
      <h1>Welcome to ImageBrowser</h1>
      <p>Discover amazing images and download them in various dimensions.</p>
      <button onClick={navigateToGallery}>Start Browsing Now</button>
    </div>
  );
};

export default HomePage;