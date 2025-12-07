import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

const initialState = {
  loading: false,
  dataDetail: null,
  dataTimeShow: null,
  error: null,
};
// Declare const Fetch Data base API Movie Detail
export const fetchMovieDetail = createAsyncThunk(
  "movie-detail/fetchMovieDetail",
  async (id, { rejectWithValue }) => {
    try {
      // Same Refactor with MovieList
      const result = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Movie Detail
    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.dataDetail = action.payload;
    });

    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
  },
});

export default movieSlice.reducer;
