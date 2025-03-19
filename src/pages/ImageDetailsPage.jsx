import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImages } from '../services/api';
import { useImageContext } from '../context/ImageContext';
import DownloadModal from '../components/DownloadModal'; // Importez la modale
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  const { id } = useParams();
  const { images } = useImageContext();
  const [image, setImage] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la modale

  useEffect(() => {
    const selectedImage = images.find((img) => img.id === parseInt(id));
    if (selectedImage) {
      setImage(selectedImage);
      fetchImages(selectedImage.photographer).then((data) =>
        setSimilarImages(data)
      );
    }
  }, [id, images]);

  const handleDownload = () => {
    setIsModalOpen(true); // Ouvrir la modale
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer la modale
  };

  if (!image) {
    return <div>Image non trouvée</div>;
  }

  return (
    <div className="image-details-page">
      <div className="main-image">
        <img src={image.src.large} alt={image.photographer} />
        <h3>{image.photographer}</h3>
        <p>Dimensions: {image.width} x {image.height}</p>
        <button onClick={handleDownload}>Download</button> {/* Bouton Download */}
      </div>
      <h4>Images similaires</h4>
      <div className="similar-images">
        {similarImages.map((img) => (
          <img key={img.id} src={img.src.small} alt={img.photographer} />
        ))}
      </div>
      {isModalOpen && <DownloadModal image={image} onClose={closeModal} />} {/* Afficher la modale */}
    </div>
  );
};

export default ImageDetailsPage;