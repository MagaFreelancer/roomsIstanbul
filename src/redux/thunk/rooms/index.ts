import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "../../../common/types/rooms";
import instance from "../../../utils/axios";

export const fetchRooms = createAsyncThunk<DataType[], void>('rooms/fetchRooms',
    async (
    ) => {
        const { data } = await instance.get<DataType[]>('/rooms');
        return data
    })

