import { AuthModel } from "./_models";

const AUTH_LOCAL_STORAGE_KEY = "access_token";

const getAuth = (): string | undefined => {
  if (!localStorage) {
    return;
  }

  const isValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!isValue) {
    return;
  }

  try {
    const auth: string = JSON.parse(isValue) as string;
    if (auth) {
      return auth;
    }
  } catch (error) {}
};

const setAuth = (apiToken: string) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(apiToken);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
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
    (err: any) => Promise.reject(err)
  );
};

export { getAuth, removeAuth, setAuth, AUTH_LOCAL_STORAGE_KEY, setupAxios };
