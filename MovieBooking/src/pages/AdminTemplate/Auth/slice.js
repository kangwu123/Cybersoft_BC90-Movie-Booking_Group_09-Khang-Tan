import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

const userInfoToString = localStorage.getItem("USER_ADMIN");
const data = userInfoToString ? JSON.parse(userInfoToString) : null;

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const authService = createAsyncThunk(
    "auth/login",
    async (user, { rejectWithValue }) => {
        try {
            const response = await api.post("QuanLyNguoiDung/DangNhap", user);
            const roles = response.data.maloaiNguoiDung;
            if (roles === "KhachHang") {
                return rejectWithValue({
                    response: {
                        data: { content: "Bạn không có quyền truy cập vào trang này." },
                    },
                });
            }
            const convertToString = JSON.stringify(response.data.content);
            localStorage.setItem("USER_ADMIN", convertToString);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const authLoginSlice = createSlice({
    name: "authLoginSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authService.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(authService.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(authService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default authLoginSlice.reducer;
