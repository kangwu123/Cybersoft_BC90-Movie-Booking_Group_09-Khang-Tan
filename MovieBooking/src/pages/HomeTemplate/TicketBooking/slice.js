import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../services/api";

const initialState = {
    loading: false,
    seats: null,
    selectedSeats: [],
    error: null,
};

export const fetchTicketBooking = createAsyncThunk(
    "ticket/fetchTicketBooking",
    async (maLichChieu, { rejectWithValue }) => {
        try {
            const result = await axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
                method: "GET",
                headers: {
                    TokenCybersoft:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
                },
            });
            console.log(maLichChieu);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const ticketBookingSlice = createSlice({
    name: "ticketBooking",
    initialState,
    reducers: {
        toggleSeat: (state, action) => {
            const maGhe = action.payload;

            if (state.selectedSeats.includes(maGhe)) {
                state.selectedSeats = state.selectedSeats.filter(id => id !== maGhe);
            } else {
                state.selectedSeats.push(maGhe);
            }
        },
        clearSeats: (state) => {
            state.selectedSeats = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicketBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTicketBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.seats = action.payload;
            })
            .addCase(fetchTicketBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleSeat, clearSeats } = ticketBookingSlice.actions;
export default ticketBookingSlice.reducer;
