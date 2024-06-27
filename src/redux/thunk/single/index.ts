import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../utils/axios";
import { DataType } from "../../../common/types/rooms";

export const fetchSingle = createAsyncThunk<DataType, number>(
    'single/fetchSingle',
    async (id: number) => {
        const { data } = await instance.get(`/rooms/${id}`);
        return data;
    }
);