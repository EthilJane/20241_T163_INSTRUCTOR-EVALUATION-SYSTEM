import { GoogleCredentialResponse } from '@react-oauth/google';
import axiosInstance, { AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosDataRequest = axiosInstance.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});
const jsonHeaderConfig: AxiosRequestConfig = {
  headers: { 'Content-Type': 'application/json' },
};
const axiosLoginRequest = axiosInstance.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: jsonHeaderConfig.headers,
});
const axios = axiosInstance.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
  headers: jsonHeaderConfig.headers,
});
axiosDataRequest.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        console.log('requesting again');
        // Make a request to your auth server to refresh the token.
        await axios.post('token/refresh');

        return axiosDataRequest(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        return Promise.reject({ errorType: 'refresh', error: refreshError });
      }
    }
    console.log(error);
    return Promise.reject({ errorType: 'unkown', error: error }); // For all other errors, return the error as is.
  }
);
export { axiosDataRequest, axiosLoginRequest };
