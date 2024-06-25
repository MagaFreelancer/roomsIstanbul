import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "../../../common/types/rooms";
import instance from "../../../utils/axios";
import { IFilters } from "../../../common/types/filters";

export const fetchRooms = createAsyncThunk<DataType[], IFilters | undefined>('rooms/fetchRooms',
    async (
        params
    ) => {
        let data;
        if (params != undefined) {
            const { searchValue, minmaxPrice, square, capacity } = params || ''

            const squareFilter = square
                .filter((item) => item.checked)
                .map((item) => `square[]=${item.value}`)
                .join('&');
            const CapacityFilter = capacity
                .filter((item) => item.checked)
                .map((item) => `capacity[]=${item.value}`)
                .join('&');
            data = await instance.get<DataType[]>(`/rooms?name=*${searchValue || ''}&${squareFilter}&${CapacityFilter}&price[from]=${minmaxPrice[0]}&price[to]=${minmaxPrice[1]}`);
        } else {
            data = await instance.get<DataType[]>(`/rooms`);
        }


        return data.data
    })