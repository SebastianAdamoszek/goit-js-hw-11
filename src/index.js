import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageCard } from './imageCard';
import { searchImages, loadMoreImages } from './imageApi';

const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  history: false,
});

loadMoreBtn.style.display = 'none';

async function displayImages(images) {
  images.forEach((image) => {
    gallery.appendChild(createImageCard(image));
  });
  loadMoreBtn.style.display = 'block';
  lightbox.refresh();
}

async function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchInput = e.target.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    clearGallery();
    try {
      const images = await searchImages(query);
      displayImages(images);
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('An error occurred. Please try again later.');
    }
  }
});

let currentPage = 1;

loadMoreBtn.addEventListener('click', async () => {
  const searchInput = searchForm.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    try {
      const images = await loadMoreImages(query, currentPage);
      if (images.length === 0) {
        Notiflix.Notify.info('No more images to load.');
      } else {
        currentPage++;
        displayImages(images);
      }
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('An error occurred while loading more images. Please try again later.');
    }
  }
});
