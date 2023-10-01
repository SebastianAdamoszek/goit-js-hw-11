// Importowanie bibliotek
import axios from "axios";
import Notiflix from 'notiflix';

// Klucz dostępu do API Pixabay
const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';

// Znajdowanie elementów HTML
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

// Funkcja do czyszczenia galerii
function clearGallery() {
  while (gallery.firstChild) {    
    gallery.removeChild(gallery.firstChild);
   
  }
}

// Funkcja do wyszukiwania i wyświetlania obrazków
async function searchAndDisplayImages(query) {
  try {
    clearGallery(); // Czyszczenie galerii przed nowym wyszukiwaniem

    // Tworzenie URL do API Pixabay z użyciem klucza
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

    // Wysyłamy żądanie GET do API Pixabay
    const response = await axios.get(URL);

    const data = response.data;

    // Sprawdzamy, czy API zwróciło wyniki
    if (data.hits.length === 0) {
      // Brak wyników, wyświetlamy powiadomienie
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    // Przetwarzamy wyniki i wyświetlamy obrazy
    data.hits.forEach((image) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      // Tworzenie elementów HTML do wyświetlenia obrazka i informacji
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');

      const img = document.createElement('img');
      img.src = webformatURL;
      img.alt = tags;
      img.loading = 'lazy';

      const info = document.createElement('div');
      info.classList.add('info');

      const likesElement = document.createElement('p');
      likesElement.classList.add('info-item');
      likesElement.textContent = `Likes: ${likes}`;

      const viewsElement = document.createElement('p');
      viewsElement.classList.add('info-item');
      viewsElement.textContent = `Views: ${views}`;

      const commentsElement = document.createElement('p');
      commentsElement.classList.add('info-item');
      commentsElement.textContent = `Comments: ${comments}`;

      const downloadsElement = document.createElement('p');
      downloadsElement.classList.add('info-item');
      downloadsElement.textContent = `Downloads: ${downloads}`;

      // Dodawanie elementów do karty obrazka
      info.appendChild(likesElement);
      info.appendChild(viewsElement);
      info.appendChild(commentsElement);
      info.appendChild(downloadsElement);

      photoCard.appendChild(img);
      photoCard.appendChild(info);

      // Dodawanie karty obrazka do galerii
      gallery.appendChild(photoCard);
      loadMoreBtn.style.display = 'block';
    });
  } catch (error) {
    // Obsługa błędów żądania HTTP
    console.error('Błąd żądania HTTP:', error.message);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
}

// Obsługa formularza wyszukiwania
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza
  const searchInput = e.target.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    searchAndDisplayImages(query);
  }
});

// Znajdowanie przycisku "Load more"


// Zmienna przechowująca numer strony (początkowo 1)
let currentPage = 1;

// Funkcja do pobierania i dodawania kolejnych obrazków
async function loadMoreImages(query) {
  try {
    currentPage++; // Inkrementacja numeru strony

    // Tworzenie URL do API Pixabay z użyciem klucza, query i numeru strony
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}`;

    // Wysyłamy żądanie GET do API Pixabay
    const response = await axios.get(URL);

    const data = response.data;

    // Sprawdzamy, czy API zwróciło wyniki
    if (data.hits.length === 0) {
      // Brak wyników, wyświetlamy powiadomienie
      Notiflix.Notify.info('No more images to load.');
      return;
    }

    // Przetwarzamy wyniki i dodajemy nowe obrazy do galerii
    data.hits.forEach((image) => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      // Tworzenie elementów HTML do wyświetlenia obrazka i informacji
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');

      const img = document.createElement('img');
      img.src = webformatURL;
      img.alt = tags;
      img.loading = 'lazy';

      const info = document.createElement('div');
      info.classList.add('info');

      const likesElement = document.createElement('p');
      likesElement.classList.add('info-item');
      likesElement.textContent = `Likes: ${likes}`;

      const viewsElement = document.createElement('p');
      viewsElement.classList.add('info-item');
      viewsElement.textContent = `Views: ${views}`;

      const commentsElement = document.createElement('p');
      commentsElement.classList.add('info-item');
      commentsElement.textContent = `Comments: ${comments}`;

      const downloadsElement = document.createElement('p');
      downloadsElement.classList.add('info-item');
      downloadsElement.textContent = `Downloads: ${downloads}`;

      // Dodawanie elementów do karty obrazka
      info.appendChild(likesElement);
      info.appendChild(viewsElement);
      info.appendChild(commentsElement);
      info.appendChild(downloadsElement);

      photoCard.appendChild(img);
      photoCard.appendChild(info);

      // Dodawanie karty obrazka do galerii
      gallery.appendChild(photoCard);
    });

    // Wyświetlenie przycisku "Load more"
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    // Obsługa błędów żądania HTTP
    console.error('Błąd żądania HTTP:', error.message);
    Notiflix.Notify.failure('An error occurred while loading more images. Please try again later.');
  }
}

// Obsługa kliknięcia przycisku "Load more"
loadMoreBtn.addEventListener('click', () => {
  const searchInput = searchForm.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    loadMoreImages(query);
    // Ukrycie przycisku "Load more" podczas ładowania nowych obrazków
    loadMoreBtn.style.display = 'none';
  }
});

