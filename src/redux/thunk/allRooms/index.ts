import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "../../../common/types/rooms";
import instance from "../../../utils/axios";

export const fetchAllRooms = createAsyncThunk<DataType[], void>('rooms/fetchAllRooms',
    async (
    ) => {
        const { data } = await instance.get<DataType[]>(`/rooms`);
        return data
    })