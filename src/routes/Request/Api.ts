import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AUTH_LOCAL_REFRESH_KEY, AUTH_LOCAL_STORAGE_KEY, getAuth, setAuth } from "../../auth/AuthHelper";
import { AuthModel } from "../../auth/_models";

export const Api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken: string | undefined = getAuth()?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

const refreshToken = async () => {
  const refreshToken: string | undefined = getAuth()?.refreshToken;
  return axios.get<AuthModel>(`${process.env.REACT_APP_API_BASE_URL}auth/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    }
  })
}

Api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && originalRequest) {
      const resp = await refreshToken();
      setAuth(resp.data.accessToken, resp.data.refreshToken)
      Api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`
      return Api(originalRequest);
    }
    return Promise.reject(error);
  }
);
