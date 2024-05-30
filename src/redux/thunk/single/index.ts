import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../utils/axios";

export const fetchSingle = createAsyncThunk('single/fetchSingle',
    async (
        id
    ) => {
        const { data } = await instance.get(`/rooms/${id}`);

        return data
    })