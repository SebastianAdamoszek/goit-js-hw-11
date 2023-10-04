import { searchImages, loadMoreImages, clearGallery } from './imageApi';


// Znajdowanie elementów HTML
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

// Obsługa formularza wyszukiwania
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza
  const searchInput = e.target.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    clearGallery(); // Czyszczenie galerii przed nowym wyszukiwaniem
    searchImages(query);
  }
});

// Obsługa przycisku "Load more"
loadMoreBtn.addEventListener('click', () => {
  const searchInput = searchForm.querySelector('input[name="searchQuery"]');
  const query = searchInput.value.trim();

  if (query.length > 0) {
    loadMoreImages(query);
    // Ukrycie przycisku "Load more"
    loadMoreBtn.style.display = 'none';
  }
});
