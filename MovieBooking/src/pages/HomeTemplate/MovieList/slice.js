import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../services/api"

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchMovieList = createAsyncThunk(
  "movie-list/fetchMovieList",
  async (_, { rejectWithValue }) => {
    try {
      // Refactor code to use api.get() base services
      const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP07")
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const movieListSlice = createSlice({
  name: "movieListSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMovieList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchMovieList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default movieListSlice.reducer;
