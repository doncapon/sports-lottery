import axios from 'axios';

const base_url =  process.env.REACT_APP_FOOTBALL_API;
const instance = axios.create({
    baseURL: base_url
});
export default instance;