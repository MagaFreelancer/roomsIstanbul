import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../utils/axios";
import { ISingleItem } from "../../../common/types/singlePage";

export const fetchSingle = createAsyncThunk<ISingleItem, number>(
    'single/fetchSingle',
    async (id: number) => {
        const { data } = await instance.get(`/rooms/${id}`);
        return data;
    }
);