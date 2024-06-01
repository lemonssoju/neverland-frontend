import { AxiosInstance } from 'axios';
import createInstance from './instance';

const Request = () => {
  const defaultRequest = async (
    path: string,
    body: (url: string, instance: AxiosInstance) => any,
  ) => {
    try {
      const instance = await createInstance(); // Ensure the instance is created
      const response = await body(path, instance);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const post = async (path: string, data: any, headers?: any) => {
    return await defaultRequest(path, async (url, instance) => {
      const response = instance.post(url, data, headers);
      return response;
    });
  };

  const get = async (path: string, params?: any, headers?: any) => {
    return await defaultRequest(path, async (url, instance) => {
      const response = instance.get(url, {
        params: params,
        headers,
      });
      return response;
    });
  };

  const patch = async (path: string, data: any, headers?: any) => {
    return await defaultRequest(path, async (url, instance) => {
      const response = instance.patch(url, data, headers);
      return response;
    });
  };

  return { post, get, patch };
};

export default Request;
