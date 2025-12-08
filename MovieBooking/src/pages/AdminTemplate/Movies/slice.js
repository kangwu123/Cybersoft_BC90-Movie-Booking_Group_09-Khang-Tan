import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
    loading: false,
    movies: null,
    movieDetail: null,
    error: null,
};

export const fetchAdminMovieList = createAsyncThunk(
    "admin/movies/fetchAdminMovieList",
    async (_, { rejectWithValue }) => {
        try {
            const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP07");
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMovieDetail = createAsyncThunk(
    "admin/movies/fetchMovieDetail",
    async (maPhim, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addMovie = createAsyncThunk(
    "admin/movies/addMovie",
    async (formData, { rejectWithValue }) => {
        try {
            // Expecting formData to be FormData with file
            const result = await api.post("QuanLyPhim/ThemPhimUploadHinh", formData);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateMovie = createAsyncThunk(
    "admin/movies/updateMovie",
    async (formData, { rejectWithValue }) => {
        try {
            const result = await api.post("QuanLyPhim/CapNhatPhimUpload", formData);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteMovie = createAsyncThunk(
    "admin/movies/deleteMovie",
    async (maPhim, { rejectWithValue }) => {
        try {
            const result = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
            return { maPhim, content: result.data.content };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const adminMovieSlice = createSlice({
    name: "adminMovie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminMovieList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAdminMovieList.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        });
        builder.addCase(fetchAdminMovieList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchMovieDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.movieDetail = action.payload;
        });
        builder.addCase(fetchMovieDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(addMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addMovie.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updateMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMovie.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.loading = false;
            if (state.movies) {
                state.movies = state.movies.filter(m => m.maPhim !== action.payload.maPhim);
            }
        });
        builder.addCase(deleteMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default adminMovieSlice.reducer;
