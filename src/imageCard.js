
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
  
    const aThumbnail = document.createElement('a');
    aThumbnail.href = largeImageURL; // Link do dużego zdjęcia
    aThumbnail.setAttribute('data-lightbox', 'gallery');
  
    const img = document.createElement('img');
    img.src = webformatURL; // Małe zdjęcie
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
  
    aThumbnail.appendChild(img);
    photoCard.appendChild(aThumbnail);

    photoCard.appendChild(info);
  
    return photoCard;
}

export { createImageCard };
