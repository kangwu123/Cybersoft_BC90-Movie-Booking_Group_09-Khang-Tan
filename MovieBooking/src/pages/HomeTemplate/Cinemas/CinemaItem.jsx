import React from "react";

export default function CinemaItem({ data }) {
    return (
        <div className="p-3 mb-2 border rounded-lg bg-white/10 hover:bg-red-400 transition">
            <p>{new Date(data.ngayChieuGioChieu).toLocaleString()}</p>
            <p className="text-sm text-gray-300">Giá vé: {data.giaVe} VNĐ</p>
        </div>
    );
}
