import React, { useEffect, useState } from 'react';
import { useImageContext } from '../context/ImageContext';
import { fetchImages } from '../services/api';
import Gallery from '../components/Gallery';
import SearchBar from '../components/SearchBar';
import './GalleryPage.css';

const GalleryPage = () => {
  const { images, setImages, isLoading, setIsLoading } = useImageContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query) {
      setIsLoading(true);
      try {
        const images = await fetchImages(query);
        setImages(images);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const images = await fetchImages('');
        setImages(images);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [setImages, setIsLoading]);

  return (
    <div className="gallery-page">
      <h2 className="gallery-title">Gallery</h2>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Gallery images={images} />
      )}
    </div>
  );
};

export default GalleryPage;