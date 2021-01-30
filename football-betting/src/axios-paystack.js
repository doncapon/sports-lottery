import axios from 'axios';

const base_url =  process.env.REACT_APP_PAYSTACK;
const token = process.env.REACT_APP_PAYSTACK_SECRET_KEY;
const instance = axios.create({
    baseURL: base_url,
    headers: {"Authorization": "Bearer "+token}
});
export default instance;

