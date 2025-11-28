import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    dataSeat: null,
    error: null,
};

export const fetchTicketBooking = createAsyncThunk(
    "ticket/fetchTicketBooking",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios({
                url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
                method: "GET",
                headers: {
                    TokenCybersoft:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
                },
            });

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const ticketBookingSlice = createSlice({
    name: "ticketBookingSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => { },
});

export default ticketBookingSlice.reducer;
