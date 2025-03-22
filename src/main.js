import { fetchImages } from '/js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    clearGallery(gallery);
    showLoader();

    fetchImages(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            renderGallery(images, gallery);
        })
        .catch(() => {
            iziToast.error({
                message: 'Something went wrong. Please try again later.',
                position: 'topRight',
            });
        })
        .finally(hideLoader);
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}
