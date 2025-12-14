import axios from "axios";

const api = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config) => {
    const admin = localStorage.getItem("USER_ADMIN");
    const user = localStorage.getItem("USER_LOGIN");

    let accessToken = "";

    if (admin) {
        accessToken = JSON.parse(admin).accessToken;
    } else if (user) {
        accessToken = JSON.parse(user).accessToken;
    }

    config.headers = {
        ...config.headers,
        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    return config;
});

export default api;

export const userApi = {
    login: (data) => api.post("QuanLyNguoiDung/DangNhap", data),
};
