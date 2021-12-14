import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResType } from '@axios/types';

// TODO: 추후 백엔드와 협의 후 설정사항이 있다면 request에 옵션을 넣어 설정하기로 한다.
/* eslint-disable prefer-destructuring */

const API_END_POINT = 'https://run.mocky.io/v3'; // Mock Test API BASE URL
const USER_AUTH_TOKEN_NAME = 'X-AUTH-TOKEN';

const requestConfigCallback = (
  authConfig: any
): AxiosRequestConfig | Promise<AxiosRequestConfig<any>> => {
  const X_USER_TOKEN = window
    ? ''
    : JSON.parse(localStorage.getItem(USER_AUTH_TOKEN_NAME) || '');

  if (X_USER_TOKEN) {
    authConfig.headers[USER_AUTH_TOKEN_NAME] = `Bearer ${X_USER_TOKEN}`;
  }

  return authConfig;
};
const rejectRequestConfigCallback = (error: any) =>
  Promise.reject(error.response);

const successResponseCallback = (res: AxiosResponse): ResType<any> => {
  return {
    data: res.data,
    headers: res.headers,
    error: {
      code: null,
      message: null,
    },
  };
};
const errorResponseCallback = (res: any) => {
  return {
    data: res.data,
    headers: res.headers,
    error: {
      code: res?.response?.status || 500,
      message: '', // TODO: 백엔드 쪽에서 메시지를 전달해줄 것인지 협의한다.
    },
  };
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    requestConfigCallback,
    rejectRequestConfigCallback
  );
  instance.interceptors.response.use(
    successResponseCallback,
    errorResponseCallback
  );
  return instance;
};

const createInstance = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_END_POINT,
  });
  return setInterceptors(instance);
};

const request = createInstance();

export default request;
