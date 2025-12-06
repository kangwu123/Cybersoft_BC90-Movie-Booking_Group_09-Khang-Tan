import React from "react";
import { useNavigate } from "react-router-dom";

export default function CinemaItem({ data }) {
    const navigate = useNavigate();

    const handleClick = () => {
        // Chuyển sang trang đặt vé với mã lịch chiếu
        navigate(`/buy-ticket?maLichChieu=${data.maLichChieu}`);
    };

    // Format giờ chiếu đẹp: "Thứ 5, 06/12/2025 - 14:00"
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
        return date.toLocaleString("vi-VN", options);
    };

    return (
        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 mb-4 shadow-md hover:shadow-xl transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-1">
                        {data.tenPhim || "Phim"}
                    </h3>
                    <p className="text-gray-300 text-sm">
                        {formatDate(data.ngayChieuGioChieu)}
                    </p>
                </div>

                <button
                    onClick={handleClick}
                    className="mt-2 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow text-white font-medium transition-all"
                >
                    Đặt vé
                </button>
            </div>
        </div>
    );
}
