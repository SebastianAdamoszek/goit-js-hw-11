import axios from 'axios';

const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';

export async function searchImages(query) {
  try {
    // Tworzenie URL i wysyłanie zapytania do API
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    const response = await axios.get(URL);
    const data = response.data;
    return data.hits; // Zwracanie tylko wyników z API
  } catch (error) {
    console.error('Błąd żądania HTTP:', error.message);
    throw new Error('An error occurred while fetching images. Please try again later.');
  }
}

export async function loadMoreImages(query, currentPage) {
  try {
    // Tworzenie URL i wysyłanie zapytania do API
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}`;
    const response = await axios.get(URL);
    const data = response.data;
    return data.hits; // Zwracanie tylko wyników z API
  } catch (error) {
    console.error('Błąd żądania HTTP:', error.message);
    throw new Error('An error occurred while loading more images. Please try again later.');
  }
}
