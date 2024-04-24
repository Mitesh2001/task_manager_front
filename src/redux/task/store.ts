import { configureStore } from "@reduxjs/toolkit";
import TaskSlice, { taskApi } from "./TaskSlice";

export const store = configureStore({
    reducer: {
        task: TaskSlice,
        [taskApi.reducerPath]: taskApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware)
});