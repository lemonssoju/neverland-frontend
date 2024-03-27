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

  console.log(API_URL)

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

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
    response => {
      const { accessToken, refreshToken, ...others } = response.data;
      if (accessToken) {
        setAccessToken(accessToken);
      }
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }
      return others;
    },
    (err: unknown) => {
      Promise.reject(err);
    }
  );

  return instance;
};

export default createInstance;
