import axios, { AxiosInstance } from 'axios';
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
} from './storage';
import { API_URL } from 'react-native-dotenv';

const createInstance = async (): Promise<AxiosInstance> => {
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  instance.interceptors.request.use(
    async config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error: unknown) => {
      console.log(error);
      Promise.reject(error);
    },
  );

  instance.defaults.headers['Set-Cookie'] = `refresh_token=${refreshToken}`;

  instance.interceptors.response.use(
    async response => {
      const { accessToken, refreshToken, ...others } = response.data;
      if (accessToken) {
        await setAccessToken(accessToken);
      }
      if (refreshToken) {
        await setRefreshToken(refreshToken);
      }
      return others;
    },
    (error: unknown) => {
      console.log(error);
      Promise.reject(error);
    }
  );

  return instance;
};

export default createInstance;
