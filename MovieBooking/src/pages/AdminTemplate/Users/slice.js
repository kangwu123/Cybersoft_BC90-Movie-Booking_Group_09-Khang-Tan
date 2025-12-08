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

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const result = await api.post('QuanLyNguoiDung/ThemNguoiDung', userInfo);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const result = await api.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung', userInfo);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const result = await api.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
      return { taiKhoan, content: result.data.content };
    } catch (error) {
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

    builder.addCase(addUser.pending, (state) => { state.loading = true; });
    builder.addCase(addUser.fulfilled, (state) => { state.loading = false; });
    builder.addCase(addUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    builder.addCase(updateUser.pending, (state) => { state.loading = true; });
    builder.addCase(updateUser.fulfilled, (state) => { state.loading = false; });
    builder.addCase(updateUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });

    builder.addCase(deleteUser.pending, (state) => { state.loading = true; });
    builder.addCase(deleteUser.fulfilled, (state, action) => { state.loading = false; if (state.dataUsers) state.dataUsers = state.dataUsers.filter(u => u.taiKhoan !== action.payload.taiKhoan); });
    builder.addCase(deleteUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default userManageSlice.reducer;
