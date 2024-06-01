import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
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
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  const loginId = await getLoginId();

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (
        accessToken === null ||
        accessToken === undefined ||
        accessToken.length === 0
      ) {
        config.headers['Authorization'] = `No Auth`;
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err: unknown) => {
      return Promise.reject(err);
    },
  );

  instance.defaults.headers['Set-Cookie'] = `refresh_token=${refreshToken}`;

  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      const { config } = response;
      const originalRequest = config;
      if (response.status === 401) {
        removeAccessToken();
        const tokenResponse = await instance.post('/users/reissue-token', {
          loginId: loginId,
          refreshToken: refreshToken,
        });
        setAccessToken(tokenResponse.data.result.accessToken);
        setRefreshToken(tokenResponse.data.result.refreshToken);
        originalRequest.headers[
          'authorization'
        ] = `${tokenResponse.data.result.accessToken}`;
        return axios(originalRequest);
      }
      return response.data;
    },
    (err: unknown) => {
      console.error(err)
      return Promise.reject(err);
    },
  );

  return instance;
};

export default createInstance;
