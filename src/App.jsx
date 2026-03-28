import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ImageDetailsPage from './pages/ImageDetailsPage';
import Header from './components/Header';
import { ImageProvider } from './context/ImageContext';

const App = () => {
  return (
    <ImageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/image/:id" element={<ImageDetailsPage />} /> {/* Route pour ImageDetailsPage */}
        </Routes>
      </Router>
    </ImageProvider>
  );
};

export default App;