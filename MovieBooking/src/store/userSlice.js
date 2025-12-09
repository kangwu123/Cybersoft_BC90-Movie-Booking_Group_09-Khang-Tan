import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userLogin: JSON.parse(localStorage.getItem("userLogin")) || null,
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        setUserLogin(state, action) {
            state.userLogin = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("userLogin", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout(state) {
            state.userLogin = null;
            state.token = null;
            localStorage.removeItem("userLogin");
            localStorage.removeItem("token");
        },
    },
});

export const { setUserLogin, logout } = userSlice.actions;
export default userSlice.reducer;
