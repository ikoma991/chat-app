import axios from 'axios';

const fetchAxios = () => {
  const token = localStorage.getItem('API_TOKEN');
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return instance
  // const defaultOptions = {
  //   baseURL: process.env.REACT_APP_API_PATH,
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };

  // let instance = axios.create(defaultOptions);

  // instance.interceptors.request.use(function (config) {
  //   const token = localStorage.getItem('token');
  //   config.headers.Authorization =  token ? `Bearer ${token}` : '';
  //   return config;
  // });

  // return instance;
};

export default fetchAxios();