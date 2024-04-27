import axios from "axios";

export const taskCreate = async (task: any) => {
  return await axios.post(`${process.env.REACT_APP_API_BASE_URL}task`, {
    ...task,
  });
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
