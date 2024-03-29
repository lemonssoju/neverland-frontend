import axios, { AxiosInstance } from 'axios';
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  getLoginId,
} from './storage';
import { API_URL } from 'react-native-dotenv';

const createInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 2000,
  });

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  const loginId = await getLoginId();

  instance.interceptors.request.use(
    async config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (err: unknown) => {
      Promise.reject(err);
    },
  );

  instance.defaults.headers['Set-Cookie'] = `refresh_token=${refreshToken}`;

  instance.interceptors.response.use(
    async response => {
      const { config } = response;
      const originalRequest = config;
      if (!response.data.isSuccess) {
        removeAccessToken();
        return await instance
          .post('/users/reissue-token', {
            loginId: loginId,
            refreshToken: refreshToken,
          })
          .then(async res => {
            setAccessToken(res.data.result.accessToken);
            setRefreshToken(res.data.result.refreshToken);
            originalRequest.headers.Authorization = `${res.data.result.accessToken}`;
            return axios(originalRequest);
          });
      }
      return response.data;
    },
    (err: unknown) => {
      Promise.reject(err);
    },
  );

  return instance;
};

export default createInstance;
