import axios from 'axios';
const instance = axios.create({ baseURL: 'https://estorebackend-ok37.onrender.com/api' });
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default instance;
