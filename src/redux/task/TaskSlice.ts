import { createSlice } from "@reduxjs/toolkit";

interface Task {
    id: string,
    title: string,
    description: string,
    status: string,
    dueDate: Date,
    assignedTo: string
}

type InitialState = {
    data: Task[] | [],
    isLoading: boolean,
    error: string | null
}

const initialState: InitialState = {
    data: [],
    isLoading: false,
    error: null
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {}
});

export const { } = taskSlice.actions;

export default taskSlice.reducer;