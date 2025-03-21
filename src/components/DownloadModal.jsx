import React, { useState } from 'react';
import './DownloadModal.css';

const DownloadModal = ({ image, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('medium');

  const handleDownload = async () => {
    const imageUrl = image.src[selectedSize]; // URL de l'image sélectionnée

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
      link.download = `image_${image.id}_${selectedSize}.jpg`; // Nom du fichier
      document.body.appendChild(link); // Ajouter le lien au DOM
      link.click(); // Déclencher le téléchargement
      document.body.removeChild(link); // Supprimer le lien du DOM

      // Libérer l'URL de l'objet Blob
      URL.revokeObjectURL(link.href);

      onClose(); // Fermer la modale
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Le téléchargement a échoué. Veuillez réessayer.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Choose Image Size</h3>
        <img src={image.src.medium} alt={image.photographer} className="modal-image" />
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="small">Small (640x960)</option>
          <option value="medium">Medium (1280x1920)</option>
          <option value="large">Large (2048x3072)</option>
        </select>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;