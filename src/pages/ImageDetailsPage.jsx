import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchImages } from '../services/api';
import { useImageContext } from '../context/ImageContext';
import DownloadModal from '../components/DownloadModal';
import './ImageDetailsPage.css';

const ImageDetailsPage = () => {
  const { id } = useParams();
  const { images } = useImageContext();
  const [image, setImage] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const selectedImage = images.find((img) => img.id === parseInt(id));
    if (selectedImage) {
      console.log('Selected Image:', selectedImage); // Vérifiez les données
      setImage(selectedImage);
      fetchImages(selectedImage.photographer).then((data) =>
        setSimilarImages(data)
      );
    }
  }, [id, images]);

  const handleDownload = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!image) {
    return <div>Image non trouvée</div>;
  }

  return (
    <div className="image-details-page">
      <div className="main-image">
        <img src={image.src.large} alt={image.photographer} />
        <h3>{image.photographer}</h3>
        <p>Dimensions: {image.width || 'N/A'} x {image.height || 'N/A'}</p>
        <button onClick={handleDownload}>Download</button>
      </div>
      <h4>Similar Images</h4>
      <div className="similar-images">
        {similarImages.map((img) => (
          <img key={img.id} src={img.src.small} alt={img.photographer} />
        ))}
      </div>
      {isModalOpen && <DownloadModal image={image} onClose={closeModal} />}
    </div>
  );
};

export default ImageDetailsPage;