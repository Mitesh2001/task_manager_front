import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    data: string[] | [],
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