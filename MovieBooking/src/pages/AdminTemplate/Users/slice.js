import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../../services/api";

const initialState = {
  loading: false,
  dataUsers: null,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP03"
      );
      return result.data.content;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const userManageSlice = createSlice({
  name: "userManageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.dataUsers = action.payload;
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userManageSlice.reducer;
