import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../../store/userSlice";
import { userApi } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const res = await userApi.login(form);

            // Lưu user vào Redux
            dispatch(
                setUserLogin({
                    user: res.data.content,
                    token: res.data.content.accessToken,
                })
            );

            // Lưu vào localStorage cho interceptor axios
            localStorage.setItem("USER_ADMIN", JSON.stringify(res.data.content));

            navigate("/");
        } catch (error) {
            setErrorMsg("Tài khoản hoặc mật khẩu không đúng!");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-3">{errorMsg}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600">Tài khoản</label>
                        <input
                            name="taiKhoan"
                            type="text"
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tài khoản..."
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-gray-600">Mật khẩu</label>
                        <input
                            name="matKhau"
                            type="password"
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium transition-all"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-500">
                    Chưa có tài khoản?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Liên hệ Admin
                    </span>
                </div>
            </div>
        </div>
    );
}
