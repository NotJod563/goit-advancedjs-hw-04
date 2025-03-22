import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
    e.preventDefault();
    query = input.value.trim();
    if (!query) return;

    page = 1;
    clearGallery(gallery);
    hideLoadMore();
    showLoader();

    try {
        const data = await fetchImages(query, page, perPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }

        renderGallery(data.hits, gallery);
        if (perPage * page < totalHits) showLoadMore();
    } catch {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
}

async function onLoadMore() {
    page += 1;
    hideLoadMore();
    showLoader();

    try {
        const data = await fetchImages(query, page, perPage);
        renderGallery(data.hits, gallery);

        if (perPage * page < totalHits) {
            showLoadMore();
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        }

        scrollGallery();
    } catch {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function showLoadMore() {
    loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
    loadMoreBtn.classList.add('hidden');
}

function scrollGallery() {
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
    });
}
