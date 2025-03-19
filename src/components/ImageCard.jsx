import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageCard.css';

const ImageCard = ({ image }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/image/${image.id}`); // Rediriger vers ImageDetailsPage
  };

  const handleDownload = async () => {
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

  return (
    <div className="image-card">
      <img src={image.src.medium} alt={image.photographer} className="image" />
      <div className="image-info">
        <p>{image.photographer}</p> {/* Afficher le nom du photographe */}
      </div>
      <div className="image-actions">
        <button onClick={handleView}>View</button> {/* Bouton View */}
        <button onClick={handleDownload}>Download</button> {/* Bouton Download */}
      </div>
    </div>
  );
};

export default ImageCard;