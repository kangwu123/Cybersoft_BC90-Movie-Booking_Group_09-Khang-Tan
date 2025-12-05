import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  dataHome: null,
  error: null,
};

export const fetchMovieHome = createAsyncThunk(
  "carousel/fetchMovieHome",
  async (_, { rejectWithValue }) => {
    try {
      const [resultCarousel, resultChainCinema] = await Promise.all([
        api.get("/QuanLyPhim/LayDanhSachBanner"),
        api.get("QuanLyRap/LayThongTinHeThongRap"),
      ]);

      const result = {
        dataCarousel: resultCarousel.data.content,
        dataChainCinema: resultChainCinema.data.content,
      };

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const movieHomeSlice = createSlice({
  name: "movieHomeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieHome.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMovieHome.fulfilled, (state, action) => {
      state.loading = false;
      state.dataHome = action.payload;
    });

    builder.addCase(fetchMovieHome.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default movieHomeSlice.reducer;
