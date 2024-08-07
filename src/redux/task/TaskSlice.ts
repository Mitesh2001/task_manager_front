import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_LOCAL_STORAGE_KEY, getAuth } from "../../auth/AuthHelper";

export enum TaskStatus {
  TO_DO = "To do",
  IN_PROGRSS = "In Progress",
  COMPLETED = "Completed",
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string;
  imagePath: string;
}

type InitialState = {
  data: Task[] | [];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  data: [],
  isLoading: false,
  error: null,
};

const authToken = getAuth();

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken?.accessToken}`,
    },
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => `task`,
    }),
  }),
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const { } = taskSlice.actions;

export const { useGetAllTasksQuery } = taskApi;

export default taskSlice.reducer;
