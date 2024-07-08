import { AxiosError, AxiosResponse } from "axios";
import { AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "access_token";
export const AUTH_LOCAL_REFRESH_KEY = "refresh_token";

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const accessTokenValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  const refreshTokenValue: string | null = localStorage.getItem(AUTH_LOCAL_REFRESH_KEY);
  if (!accessTokenValue || !refreshTokenValue) {
    return;
  }

  try {
    const access_token: string = JSON.parse(accessTokenValue) as string;
    const refresh_token: string = JSON.parse(refreshTokenValue) as string;
    if (access_token && refresh_token) {
      return { accessToken: access_token, refreshToken: refresh_token };
    }
  } catch (error) { }
};

const setAuth = (accessToken: string, refreshToken: string) => {
  if (!localStorage) {
    return;
  }

  try {
    const accessTokenValue = JSON.stringify(accessToken);
    const refreshTokenValue = JSON.stringify(refreshToken);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, accessTokenValue);
    localStorage.setItem(AUTH_LOCAL_REFRESH_KEY, refreshTokenValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }
  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    localStorage.removeItem(AUTH_LOCAL_REFRESH_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

const setupAxios = (axios: any) => {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth) {
        config.headers.Authorization = `Bearer ${auth}`;
      }

      return config;
    },
    (error: AxiosError) => {
      const originalRequest = error.config;
      console.log(originalRequest)
    }
  );
};

export { getAuth, removeAuth, setAuth, AUTH_LOCAL_STORAGE_KEY, setupAxios };
