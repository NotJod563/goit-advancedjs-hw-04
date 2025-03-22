import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49358142-402c973293bc6ed019a77a93c';

export async function fetchImages(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
}