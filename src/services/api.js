const API_KEY = 'wWhYtGyerI3FUOWz9HmSFYWEToCmhGunONOdjJTZ75boTbrzlIkiIALx';
const BASE_URL = 'https://api.pexels.com/v1';

export const fetchImages = async (query, page = 1) => {
    const url = query
      ? `${BASE_URL}/search?query=${query}&page=${page}&per_page=30`
      : `${BASE_URL}/curated?page=${page}&per_page=30`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: API_KEY,
      },
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des images');
    }
  
    const data = await response.json();
    return data.photos.map((photo) => ({
      id: photo.id,
      width: photo.width, // Inclure la largeur
      height: photo.height, // Inclure la hauteur
      photographer: photo.photographer,
      src: {
        small: photo.src.small,
        medium: photo.src.medium,
        large: photo.src.large,
      },
      photographer: photo.photographer
    }));
  };