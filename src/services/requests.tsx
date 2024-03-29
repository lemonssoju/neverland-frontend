import createInstance from './instance';

const Request = () => {
  const instance = createInstance();
  const defaultRequest = async (path: string, body: (url: string) => any) => {
    try {
      const response = body(path);
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const post = async (path: string, data: any) => {
    return await defaultRequest(path, async url => {
      const response = (await instance).post(url, data);
      return response;
    });
  };

  const get = async (path: string, params: any) => {
    return await defaultRequest(path, async url => {
      const response = (await instance).get(url, {
        params: params,
      });
      return response;
    });
  };

  const patch = async (path: string, data: any) => {
    return await defaultRequest(path, async url => {
      const response = (await instance).patch(url, data);
      return response;
    });
  };

  return { post, get, patch };
};

export default Request;
