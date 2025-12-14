import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserLogin } from "./userSlice";
import { userApi } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

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

            dispatch(
                setUserLogin({
                    user: res.data.content,
                    token: res.data.content.accessToken,
                })
            );

            localStorage.setItem("USER_LOGIN", JSON.stringify(res.data.content));

            navigate("/");
        } catch (error) {
            setErrorMsg("Tài khoản hoặc mật khẩu không đúng!");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">

            <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8">

                <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
                    🎬 Đăng nhập hệ thống
                </h2>

                {errorMsg && (
                    <p className="text-red-300 text-center mb-4 font-medium">
                        {errorMsg}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* USERNAME */}
                    <div>
                        <label className="block mb-1 text-white font-medium">
                            Tài khoản
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-white/70" size={18} />
                            <input
                                name="taiKhoan"
                                type="text"
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 border border-white/40 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="Nhập tài khoản..."
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block mb-1 text-white font-medium">
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-white/70" size={18} />
                            <input
                                name="matKhau"
                                type="password"
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/30 border border-white/40 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-300 outline-none"
                                placeholder="Nhập mật khẩu..."
                            />
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white/90 hover:bg-white text-blue-600 font-semibold rounded-xl shadow-lg transition-all"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center text-white/80 mt-5 text-sm">
                    Chưa có tài khoản?{" "}
                    <span className="text-white font-semibold underline cursor-pointer">
                        Liên hệ Admin
                    </span>
                </p>
            </div>
        </div>
    );
}
