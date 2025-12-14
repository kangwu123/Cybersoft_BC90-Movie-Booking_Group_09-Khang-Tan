import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
            const result = await api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const datVe = createAsyncThunk(
    "ticketBooking/datVe",
    async ({ maLichChieu, danhSachVe }, { rejectWithValue }) => {
        try {
            const res = await api.post("QuanLyDatVe/DatVe", {
                maLichChieu,
                danhSachVe,
            });
            return res.data.content;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
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
            // ===== LẤY DANH SÁCH GHẾ =====
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
            })
            // ===== ĐẶT VÉ =====
            .addCase(datVe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(datVe.fulfilled, (state) => {
                state.loading = false;
                state.selectedSeats = []; //  reset ghế sau khi đặt
            })
            .addCase(datVe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleSeat, clearSeats } = ticketBookingSlice.actions;
export default ticketBookingSlice.reducer;
