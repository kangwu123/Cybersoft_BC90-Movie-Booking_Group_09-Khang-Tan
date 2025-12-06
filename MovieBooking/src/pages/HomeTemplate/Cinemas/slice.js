import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    dataCinemaList: null,
    dataCinema: null,
    dataTimeShow: null,
    error: null,
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk";

// Fetch danh sách hệ thống rạp
export const fetchCinemaList = createAsyncThunk(
    "cinema/fetchCinemaList",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
                { headers: { TokenCybersoft: token } }
            );
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Fetch cụm rạp theo hệ thống
export const fetchCinema = createAsyncThunk(
    "cinema/fetchCinema",
    async (maHeThongRap, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
                { headers: { TokenCybersoft: token } }
            );
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Fetch lịch chiếu theo hệ thống
export const fetchTimeShow = createAsyncThunk(
    "cinema/fetchTimeShow",
    async (maHeThongRap, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP07`,
                { headers: { TokenCybersoft: token } }
            );
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const cinemaSlice = createSlice({
    name: "cinema",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Cinema List
            .addCase(fetchCinemaList.pending, (state) => { state.loading = true; })
            .addCase(fetchCinemaList.fulfilled, (state, action) => {
                state.loading = false;
                state.dataCinemaList = action.payload;
            })
            .addCase(fetchCinemaList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Cinema
            .addCase(fetchCinema.pending, (state) => { state.loading = true; })
            .addCase(fetchCinema.fulfilled, (state, action) => {
                state.loading = false;
                state.dataCinema = action.payload;
            })
            .addCase(fetchCinema.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Time Show
            .addCase(fetchTimeShow.pending, (state) => { state.loading = true; })
            .addCase(fetchTimeShow.fulfilled, (state, action) => {
                state.loading = false;
                state.dataTimeShow = action.payload;
            })
            .addCase(fetchTimeShow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cinemaSlice.reducer;
