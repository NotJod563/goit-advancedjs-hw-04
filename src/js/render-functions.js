import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function renderGallery(images, container) {
    const markup = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${likes}</p>
        <p><b>Views</b> ${views}</p>
        <p><b>Comments</b> ${comments}</p>
        <p><b>Downloads</b> ${downloads}</p>
      </div>
    </li>`
        )
        .join('');

    container.insertAdjacentHTML('beforeend', markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
    } else {
        lightbox.refresh();
    }
}

export function clearGallery(container) {
    container.innerHTML = '';
}
