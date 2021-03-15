import axios from 'axios';

const base_url =  process.env.REACT_APP_FOOTBALL_API;
const app_key = process.env.REACT_APP_FOOTBALL_APP_KEY;
const api_host = process.env.REACT_APP_FOOTBALL_API_HOST;
const instance = axios.create({
    baseURL: base_url,
    headers: {
        'x-rapidapi-key' : app_key,
        'x-rapidapi-host': api_host,
        "useQueryString": true
    }
});
export default instance;