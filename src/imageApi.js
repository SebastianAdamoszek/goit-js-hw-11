import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  history: false,
});

function createImageCard(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const a = document.createElement('a');
  a.href = largeImageURL;
  a.setAttribute('data-lightbox', 'gallery');

  const img = document.createElement('img');
  img.src = webformatURL;
  img.alt = tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  function createInfoItem(label, value) {
    const element = document.createElement('p');
    element.classList.add('info-item');
    element.textContent = `${label}: ${value}`;
    return element;
  }

  info.appendChild(createInfoItem('Likes', likes));
  info.appendChild(createInfoItem('Views', views));
  info.appendChild(createInfoItem('Comments', comments));
  info.appendChild(createInfoItem('Downloads', downloads));

  a.appendChild(img);
  photoCard.appendChild(a);
  photoCard.appendChild(info);

  return photoCard;
}

function displayImages(images) {
  images.forEach((image) => {
    gallery.appendChild(createImageCard(image));
  });
  loadMoreBtn.style.display = 'block';
  lightbox.refresh();
}

export async function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}

export async function searchImages(query) {
  try {
    clearGallery();
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
    const response = await axios.get(URL);
    const data = response.data;
    if (data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
    displayImages(data.hits);
  } catch (error) {
    console.error('Błąd żądania HTTP:', error.message);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
}

let currentPage = 1;

export async function loadMoreImages(query) {
  try {
    currentPage++;
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}`;
    const response = await axios.get(URL);
    const data = response.data;
    if (data.hits.length === 0) {
      Notiflix.Notify.info('No more images to load.');
      return;
    }
    displayImages(data.hits);
  } catch (error) {
    console.error('Błąd żądania HTTP:', error.message);
    Notiflix.Notify.failure('An error occurred while loading more images. Please try again later.');
  }
}
