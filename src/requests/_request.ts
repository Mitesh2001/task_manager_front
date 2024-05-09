import axios from "axios";
import { Api } from "../routes/Request/Api";

export const login = async (userDetails: any) => {
  return Api.post(`/auth/login`, userDetails);
};

export const registration = async (userDetails: any) => {
  return Api.post(`/user`, userDetails);
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
    }
  );
};

export const taskDelete = async (taskId: string) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_BASE_URL}task/${taskId}`
  );
};
