import { Api } from "../routes/Request/Api";
import { AuthModel, User } from "../auth/_models";

export const login = async (userDetails: any) => {
  return Api.post<AuthModel>(`/auth/login`, userDetails);
};

export const registration = async (userDetails: any) => {
  return Api.post<AuthModel>(`/auth/signup`, userDetails);
};

export const Logout = async () => {
  return Api.get(`/auth/logout`);
};

export const getUserByToken = async (api_token: string) => {
  return Api.post<User>("/auth/verify_token");
};

export const taskCreate = async (task: any) => {
  return await Api.post(
    `task`,
    {
      ...task,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const taskUpdate = async (task: any, taskId: string) => {
  return await Api.put(
    `task/${taskId}`,
    {
      ...task,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const taskDelete = async (taskId: string) => {
  return await Api.delete(
    `task/${taskId}`
  );
};
