import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "../../../common/types/rooms";
import instance from "../../../utils/axios";
import { IFilters } from "../../../common/types/filters";

export const fetchRooms = createAsyncThunk<DataType[], IFilters>('rooms/fetchRooms',
    async (
        params
    ) => {
        const { searchValue, minmaxPrice, square } = params || ''
        const squareFilter = square
            .filter((item) => item.checked)
            .map((item) => `square[]=${item.value}`)
            .join('&');

        const { data } = await instance.get<DataType[]>(`/rooms?name=*${searchValue || ''}&${squareFilter}&price[from]=${minmaxPrice[0]}&price[to]=${minmaxPrice[1]}`);
        return data
    })