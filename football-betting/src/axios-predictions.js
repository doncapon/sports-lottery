import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-football-v1.p.rapidapi.com/v2/'
});
// predictions/157462
export default instance;