import React from 'react'
import { Link } from 'react-router-dom';

const TimeShow = ({ propTimeShow }) => {
    return (
        <Link
            to="/buy-ticket"
            key={propTimeShow.maLichChieu}
            className="px-4 py-3 rounded-xl bg-white shadow-md text-black font-semibold hover:bg-amber-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
            {new Date(propTimeShow.ngayChieuGioChieu).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            })}
        </Link>
    )
}
export default TimeShow
