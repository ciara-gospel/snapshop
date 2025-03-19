import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DownloadModal from './DownloadModal'; // Importez le composant DownloadModal
import './ImageCard.css';

const ImageCard = ({ image }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = () => {
    navigate(`/image/${image.id}`);
  };

  const handleDownload = () => {
    setIsModalOpen(true); // Ouvre la modale
  };

  const closeModal = () => {
    setIsModalOpen(false); // Ferme la modale
  };

  return (
    <div className="image-card">
      <img src={image.src.medium} alt={image.photographer} className="image" />
      <div className="image-info">
        <p>{image.photographer}</p> {/* Afficher le nom du photographe */}
      </div>
      <div className="image-actions">
        <button onClick={handleView}>View</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      {isModalOpen && <DownloadModal image={image} onClose={closeModal} />} {/* Affiche la modale */}
    </div>
  );
};

export default ImageCard;