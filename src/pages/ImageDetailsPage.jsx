import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImages } from '../services/api';
import { useImageContext } from '../context/ImageContext';
import { FaDownload, FaEye } from 'react-icons/fa';
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { images } = useImageContext();
  const [image, setImage] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState('original');

  const sizeOptions = [
    { value: 'small', label: 'Small (640px)' },
    { value: 'medium', label: 'Medium (1280px)' },
    { value: 'large', label: 'Large (1920px)' },
    { value: 'original', label: 'Original' }
  ];

  const navigateToGallery = () => {
    navigate('/gallery');
  };

  useEffect(() => {
    const loadImageDetails = async () => {
      try {
        const selectedImage = images.find((img) => img.id === parseInt(id));
        if (selectedImage) {
          setImage(selectedImage);
          const similar = await fetchImages(selectedImage.photographer);
          setSimilarImages(similar);
        } else {
          const imageData = await fetchImages('', id);
          if (imageData) {
            setImage(imageData);
            const similar = await fetchImages(imageData.photographer);
            setSimilarImages(similar);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails de l\'image :', error);
      }
    };

    loadImageDetails();
  }, [id, images]);

  const handleDownload = async () => {
    if (!image) return;

    // Sélection de l'URL selon la taille choisie
    const imageUrl = {
      small: image.src.small,
      medium: image.src.medium,
      large: image.src.large,
      original: image.src.original
    }[selectedSize];

    try {
      // Même méthode que dans ImageCard
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'image');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `image_${image.id}_${selectedSize}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      // Feedback visuel
      const button = document.querySelector('.download-button');
      button.classList.add('downloading');
      setTimeout(() => button.classList.remove('downloading'), 1000);

    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Le téléchargement a échoué. Veuillez réessayer.');
    }
  };

  const handleViewSimilarImage = (id) => {
    navigate(`/image/${id}`);
  };

  const handleDownloadSimilarImage = async (img) => {
    try {
      // Même méthode que dans ImageCard
      const response = await fetch(img.src.original);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'image');
      }

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `image_${img.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Le téléchargement a échoué. Veuillez réessayer.');
    }
  };

  if (!image) {
    return <div className="loading-message">Image non trouvée</div>;
  }

  return (
    <>
      <div className="image-details-page">
        <div className="main-image-container">
          <div className="main-image">
            <img src={image.src.large} alt={image.photographer} />
          </div>
          <div className="details">
            <div className="toget">
              <h3>{image.photographer}</h3>
              <p>Dimensions: {image.width} x {image.height}</p>
            </div>
            <div className="download-options">
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-selector"
              >
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button onClick={handleDownload} className="download-button">
                <span className="desktop-text">Download</span>
                <FaDownload className="mobile-icon"/>
              </button>
            </div>
          </div>
        </div>

        <h4 className="similar-images-title">Similar Images</h4>
        <div className="similar-images">
          {similarImages.map((img) => (
            <div key={img.id} className="similar-image-card">
              <img src={img.src.medium} alt={img.photographer} />
              <div className="image-info">
                <p>{img.photographer}</p>
              </div>
              <div className="image-actions">
                <button onClick={() => handleViewSimilarImage(img.id)}>
                  <span className="desktop-text">View</span>
                  <FaEye className="mobile-icon" />
                </button>
                <button onClick={() => handleDownloadSimilarImage(img)}>
                  <span className="desktop-text">Download</span>
                  <FaDownload className="mobile-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="back">
        <button onClick={navigateToGallery} className="previous">Previous</button>
      </div>
    </>
  );
};

export default ImageDetailsPage;