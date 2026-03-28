const API_KEY = 'wWhYtGyerI3FUOWz9HmSFYWEToCmhGunONOdjJTZ75boTbrzlIkiIALx';
const BASE_URL = 'https://api.pexels.com/v1';

export const fetchImages = async (query, id = null) => {
    let url;
    if (id) {
      url = `${BASE_URL}/photos/${id}`; // Récupérer une image spécifique par ID
    } else {
      url = query
        ? `${BASE_URL}/search?query=${query}&per_page=30`
        : `${BASE_URL}/curated?per_page=30`;
    }
  
    const response = await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des images');
    }
  
    const data = await response.json();
    if (id) {
      // Retourner une seule image si un ID est spécifié
      return {
        id: data.id,
        src: data.src,
        photographer: data.photographer,
        width: data.width,
        height: data.height,
      };
    } else {
      // Retourner une liste d'images
      return data.photos.map((photo) => ({
        id: photo.id,
        src: photo.src,
        photographer: photo.photographer,
        width: photo.width,
        height: photo.height,
      }));
    }
  };