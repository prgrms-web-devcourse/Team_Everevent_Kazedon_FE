import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

interface optionsType {
  [option: string]: any;
}

// TODO: 추후 백엔드와 협의 후 설정사항이 있다면 request에 옵션을 넣어 설정하기로 한다.
/* eslint-disable prefer-destructuring */
const API_END_POINT = 'https://run.mocky.io'; // Mock Test API BASE URL

const configInterceptorCallback = (config: AxiosRequestConfig) => config;
const errorCallback = (error: AxiosError) => Promise.reject(error.response);
const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(configInterceptorCallback, errorCallback);

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
  return instance;
};

const createInstance = (options: optionsType) => {
  const instance: AxiosInstance = axios.create({
    ...options,
  });
  return setInterceptors(instance);
};

const request = createInstance({
  baseURL: API_END_POINT,
  timeout: 5000,
});

export { request };
