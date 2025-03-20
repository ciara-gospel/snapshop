import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchImages } from '../services/api';
import { useImageContext } from '../context/ImageContext';
import DownloadModal from '../components/DownloadModal';
import { FaDownload, FaEye } from 'react-icons/fa';
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  const { id } = useParams(); // Récupérer l'ID de l'image depuis l'URL
  const navigate = useNavigate();
  const { images } = useImageContext();
  const [image, setImage] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const navigateToGallery = () => {
    navigate('/gallery');
  };

  // Charger les détails de l'image et les images similaires
  useEffect(() => {
    const loadImageDetails = async () => {
      try {
        // Trouver l'image sélectionnée dans le contexte
        const selectedImage = images.find((img) => img.id === parseInt(id));
        if (selectedImage) {
          setImage(selectedImage); // Mettre à jour l'image actuelle
          // Charger les images similaires
          const similar = await fetchImages(selectedImage.photographer);
          setSimilarImages(similar);
        } else {
          // Si l'image n'est pas trouvée dans le contexte, la récupérer via l'API
          const imageData = await fetchImages('', id); // Utilisez une fonction adaptée pour récupérer une image par ID
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
  }, [id, images]); // Recharger les données lorsque l'ID change

  const handleDownload = () => {
    setIsModalOpen(true); // Ouvrir la modale
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer la modale
  };

  const handleViewSimilarImage = (id) => {
    navigate(`/image/${id}`); // Rediriger vers les détails de l'image similaire
  };

  const handleDownloadSimilarImage = async (image) => {
    const imageUrl = image.src.medium; // URL de l'image à télécharger

    try {
      // Récupérer l'image en tant que Blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'image');
      }

      const blob = await response.blob(); // Convertir la réponse en Blob

      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob); // Créer une URL pour le Blob
      link.download = `image_${image.id}.jpg`; // Nom du fichier
      document.body.appendChild(link); // Ajouter le lien au DOM
      link.click(); // Déclencher le téléchargement
      document.body.removeChild(link); // Supprimer le lien du DOM

      // Libérer l'URL de l'objet Blob
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Le téléchargement a échoué. Veuillez réessayer.');
    }
  };

  if (!image) {
    return <div>Image non trouvée</div>;
  }

  return (
    <>
    <div className="image-details-page">
      <div className="main-image">
        <img src={image.src.large} alt={image.photographer} />
        <h3>{image.photographer}</h3>
        <p>Dimensions: {image.width} x {image.height}</p>
        <button onClick={handleDownload}>Download</button>
      </div>
      <h4>Similar Images</h4>
      <div className="similar-images">
        {similarImages.map((img) => (
          <div key={img.id} className="similar-image-card">
            <img src={img.src.medium} alt={img.photographer} />
            <div className="image-info">
              <p>{img.photographer}</p> {/* Nom du photographe */}
            </div>
            <div className="image-actions">
              <button onClick={() => handleViewSimilarImage(img.id)}>
              <span className="desktop-text">View</span> {/* Texte pour desktop */}
              <FaEye className="mobile-icon" /> {/* Icône pour mobile */}
              </button>
              <button onClick={() => handleDownloadSimilarImage(img)}>
                <span className="desktop-text">Download</span> {/* Texte pour desktop */}
                <FaDownload className="mobile-icon" /> {/* Icône pour mobile */}
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <DownloadModal image={image} onClose={closeModal} />}
    </div>
    <div className="back">
    <button onClick={navigateToGallery} className="previous">previous</button>
    </div>
    </>
  );
};

export default ImageDetailsPage;