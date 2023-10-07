import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageCard } from './imageCard';
import { searchImages } from './imageApi';
const gallery = document.querySelector('.gallery');
const photoCard = document.querySelector('.photo-card');
  photoCard.style.display = 'none';
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  history: false,
});

loadMoreBtn.style.display = 'none';

function displayImages(images) {
  images.forEach(image => {
    gallery.appendChild(createImageCard(image));
  });

  photoCard.style.display = 'block';
  loadMoreBtn.style.display = 'block';
  lightbox.refresh();
}

async function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}

const searchForm = document.getElementById('search-form');
let query = ''; // Zmienna przechowujaca wartość pola input

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchInput = e.target.querySelector('input[name="searchQuery"]');
  query = searchInput.value.trim(); // Przypisuje wartość do zmiennej

  if (query.length > 0) {
    clearGallery();
    try {
      const images = await searchImages(query);
      displayImages(images);
      searchInput.value = ''; // Czyszcze pole input

    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('An error occurred. Please try again later.');
    }
  }
});

// Obsługa przycisku "Load more"
let page = 2;

loadMoreBtn.addEventListener('click', async () => {
  if (query.length > 0) { // Użyj zapamiętanej wartości
    try {
      // Ładowanie kolejnych stron
      const images = await searchImages(query, page);
      if (images.length === 0) {
        Notiflix.Notify.info('No more images to load.');
      } else {
        page++;
        displayImages(images);
      }
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure(
        'An error occurred while loading more images. Please try again later.'
      );
    }
  }
});

