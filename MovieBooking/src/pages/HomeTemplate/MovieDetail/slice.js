import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../services/api";

const initialState = {
  loading: false,
  dataDetail: null,
  dataCinemaList: null,
  dataCinema: null,
  dataTimeShow: null,
  error: null,
};
// Declare const Fetch Data base API Movie Detail
export const fetchMovieDetail = createAsyncThunk(
  "movie-detail/fetchMovieDetail",
  async (id, { rejectWithValue }) => {
    try {
      // Same Refactor with MovieList
      const [resultDetail, _schedule] = await Promise.all([
        api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`),
        api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`),
      ]);
      return resultDetail.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Declare const Fetch Data base API Group Movie List & Each Cinema
export const fetchCinemaList = createAsyncThunk(
  "movie/fetchMovieCinema",
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

export const fetchCinema = createAsyncThunk(
  "movie/fetchCinema",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
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
// Declare const Fetch Data base API TimeShow
export const fetchTimeShow = createAsyncThunk(
  "movie/fetchTimeShow",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP07`,
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
    
    // CINEMA LIST
    builder.addCase(fetchCinemaList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCinemaList.fulfilled, (state, action) => {
      state.loading = false;
      state.dataCinemaList = action.payload;
    });
    builder.addCase(fetchCinemaList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

     // EACH CINEMA
    builder.addCase(fetchCinema.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCinema.fulfilled, (state, action) => {
      state.loading = false;
      state.dataCinema = action.payload;
    });
    builder.addCase(fetchCinema.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

      // TIME SHOW
    builder.addCase(fetchTimeShow.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTimeShow.fulfilled, (state, action) => {
      state.loading = false;
      state.dataTimeShow = action.payload;
    });
    builder.addCase(fetchTimeShow.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default movieSlice.reducer;
