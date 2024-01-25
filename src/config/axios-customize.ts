import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL as string;

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
