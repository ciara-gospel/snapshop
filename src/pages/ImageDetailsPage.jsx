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

    let downloadUrl;
    let sizeLabel = '';
    
    switch (selectedSize) {
      case 'small':
        downloadUrl = image.src.small;
        sizeLabel = 'small';
        break;
      case 'medium':
        downloadUrl = image.src.medium;
        sizeLabel = 'medium';
        break;
      case 'large':
        downloadUrl = image.src.large;
        sizeLabel = 'large';
        break;
      default:
        downloadUrl = image.src.original;
        sizeLabel = 'original';
    }

    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const photographerName = image.photographer.toLowerCase().replace(/\s+/g, '_');
      const fileName = `image_${photographerName}_${sizeLabel}_${image.id}.jpg`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      const button = document.querySelector('.download-button');
      button.classList.add('downloading');
      setTimeout(() => button.classList.remove('downloading'), 1000);
      
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      const fallbackLink = document.createElement('a');
      fallbackLink.href = downloadUrl;
      fallbackLink.download = `image_${image.id}_${sizeLabel}.jpg`;
      fallbackLink.target = '_blank';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  };

  const handleViewSimilarImage = (id) => {
    navigate(`/image/${id}`);
  };

  const handleDownloadSimilarImage = async (img) => {
    try {
      const response = await fetch(img.src.original);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `image_${img.id}.jpg`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      const fallbackLink = document.createElement('a');
      fallbackLink.href = img.src.original;
      fallbackLink.download = `image_${img.id}.jpg`;
      fallbackLink.target = '_blank';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
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
                <button 
                  onClick={() => handleViewSimilarImage(img.id)}
                  className="view-button"
                >
                  <span className="desktop-text">View</span>
                  <FaEye className="mobile-icon" />
                </button>
                <button 
                  onClick={() => handleDownloadSimilarImage(img)}
                  className="download-similar-button"
                >
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