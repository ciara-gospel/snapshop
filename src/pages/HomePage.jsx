import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import '../../src/index.css';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToGallery = () => {
    navigate('/gallery');
  };


  return (
    <div className="home-page">
        <h1>Welcome to ImageDownloader</h1>
        <p>Discover amazing images and download them in various dimensions.</p>
        <div className="content">
          <div className="image-scroll-container">
          <img src="https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbG9yc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb3JzfGVufDB8fDB8fHww" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1682096348418-dbef9b1d0add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRvdXJpc3R8ZW58MHx8MHx8fDA%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1633867113487-5118d97e546d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRvdXJpc3R8ZW58MHx8MHx8fDA%3D" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1664353834004-9684512a27fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsaW5nfGVufDB8fDB8fHww" alt="" />
          <img src="https://images.unsplash.com/photo-1522729525412-d848b2319ded?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1521579880562-101f47676ee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsaW5nfGVufDB8fDB8fHww" alt="" />
          <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1463438690606-f6778b8c1d10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvbG9yc3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29kZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1685082778205-8665f65e8c2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sb3JzfGVufDB8fDB8fHww" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1682096348418-dbef9b1d0add?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRvdXJpc3R8ZW58MHx8MHx8fDA%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1633867113487-5118d97e546d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRvdXJpc3R8ZW58MHx8MHx8fDA%3D" alt="" />
          <img src="https://plus.unsplash.com/premium_photo-1664353834004-9684512a27fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsaW5nfGVufDB8fDB8fHww" alt="" />
          <img src="https://images.unsplash.com/photo-1522729525412-d848b2319ded?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          <img src="https://images.unsplash.com/photo-1521579880562-101f47676ee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJhdmVsaW5nfGVufDB8fDB8fHww" alt="" />
          <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
        </div>
        </div>
        <button onClick={navigateToGallery}>Start Browsing</button>
    </div>
  );
};

export default HomePage;