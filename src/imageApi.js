import axios from 'axios';

const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';
const baseURL = 'https://pixabay.com/api/';

export async function searchImages(query, page = 1) {
  try {
    const url = `${baseURL}`;
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: page,
    };

    const response = await axios.get(url, { params });
    const data = response.data;

    if (data.hits.length === 0) {
      throw new Error('No images found.');
    }

    return data.hits;
  } catch (error) {
    console.error('Błąd żądania HTTP:', error.message);
    throw new Error('An error occurred while fetching images. Please try again later.');
  }
}


