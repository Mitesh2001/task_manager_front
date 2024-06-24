import axios from "axios";
import { Api } from "../routes/Request/Api";
import { AuthModel, User } from "../auth/_models";

export const login = async (userDetails: any) => {
  return Api.post<AuthModel>(`/auth/login`, userDetails);
};

export const registration = async (userDetails: any) => {
  return Api.post<AuthModel>(`/auth/signup`, userDetails);
};

export const getUserByToken = async (api_token: string) => {
  return Api.post<User>("/auth/verify_token", { access_token: api_token });
};

export const taskCreate = async (task: any) => {
  return await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}task`,
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
  return await axios.put(
    `${process.env.REACT_APP_API_BASE_URL}task/${taskId}`,
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
  return await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}task/${taskId}`
  );
};
