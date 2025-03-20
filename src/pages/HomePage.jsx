import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import '../../src/index.css'; // Fichier CSS pour le style

const HomePage = () => {
  const navigate = useNavigate();
  const [currentBackground, setCurrentBackground] = useState(0); // Index de l'image actuelle
  const backgrounds = [
    'url(https://images.pexels.com/photos/2400594/pexels-photo-2400594.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load)',
    'url(https://images.pexels.com/photos/3331094/pexels-photo-3331094.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load)',
    'url(https://images.pexels.com/photos/673020/pexels-photo-673020.jpeg?auto=compress&cs=tinysrgb&w=300)',
    'url(https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&w=300)',
    'url(https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?auto=compress&cs=tinysrgb&w=300)',
    'url(https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=300)',
  ];

  const navigateToGallery = () => {
    navigate('/gallery');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length); // Passer à l'image suivante
    }, 5000); // Changer d'image toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, [backgrounds.length]);


  return (
    <div className="home-page">
      <div className="background-slider">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className="background-slide"
            style={{ backgroundImage: bg }}
          />
        ))}
      </div>
      <div className="content">
        <h1>Welcome to ImageBrowser</h1>
        <p>Discover amazing images and download them in various dimensions.</p>
        <button onClick={navigateToGallery}>Start Browsing</button>
      </div>
    </div>
  );
};

export default HomePage;