import axios from 'axios';

let API = 'https://dummyjson.com';

export const Instance = axios.create({
  baseURL: API,
});

Instance.defaults.headers.get['Accept'] = 'application/json';
Instance.defaults.headers.post['Accept'] = 'application/json';
