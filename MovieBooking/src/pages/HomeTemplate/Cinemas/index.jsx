import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaList, fetchCinema, fetchTimeShow } from "./slice";
import { useNavigate } from "react-router-dom";

export default function CinemaPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataCinemaList, dataCinema, dataTimeShow } = useSelector(s => s.cinema);

    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedCumRap, setSelectedCumRap] = useState(null);

    useEffect(() => {
        dispatch(fetchCinemaList());
    }, [dispatch]);

    useEffect(() => {
        if (selectedSystem) {
            dispatch(fetchCinema(selectedSystem));
            dispatch(fetchTimeShow(selectedSystem));
            setSelectedCumRap(null);
        }
    }, [selectedSystem, dispatch]);

    const allCumRap = Array.isArray(dataTimeShow)
        ? dataTimeShow.flatMap(h => Array.isArray(h?.lstCumRap) ? h.lstCumRap : [])
        : [];

    const selectedCumRapObj = selectedCumRap
        ? allCumRap.find(c => c.maCumRap === selectedCumRap)
        : null;

    const handleBuyTicket = (maLichChieu) => {
        navigate(`/buy-ticket?maLichChieu=${maLichChieu}`);
    };

    const formatFullDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className="container mx-auto py-10 text-white">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Chọn Rạp & Lịch Chiếu
            </h1>

            {/* Hệ thống rạp */}
            <div className="flex gap-6 justify-center mb-10 flex-wrap">
                {dataCinemaList?.map(item => (
                    <button
                        key={item.maHeThongRap}
                        onClick={() => setSelectedSystem(item.maHeThongRap)}
                        className={`px-5 py-2 rounded-full border transition flex items-center gap-2 ${selectedSystem === item.maHeThongRap
                            ? "bg-red-500"
                            : "bg-white/10 hover:bg-red-400"
                            }`}
                    >
                        {item.logo && (
                            <img src={item.logo} alt={item.tenHeThongRap} className="w-6 h-6 object-contain" />
                        )}
                        {item.tenHeThongRap}
                    </button>
                ))}
            </div>

            {/* Layout: Lịch chiếu bên trái, cụm rạp bên phải */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Lịch chiếu */}
                <div className="flex-1">
                    {selectedCumRapObj ? (
                        selectedCumRapObj.danhSachPhim?.map(phim => (
                            <div
                                key={phim.tenPhim}
                                className="mb-6 bg-gray-900/70 border border-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition"
                            >
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                    {/* Poster phim */}
                                    {phim.hinhAnh && (
                                        <img
                                            src={phim.hinhAnh}
                                            alt={phim.tenPhim}
                                            className="w-32 h-48 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-2">
                                            {phim.tenPhim}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {phim.lstLichChieuTheoPhim?.map(lich => (
                                                <button
                                                    key={lich.maLichChieu}
                                                    onClick={() => handleBuyTicket(lich.maLichChieu)}
                                                    className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg shadow text-white font-medium transition-all flex flex-col items-center"
                                                >
                                                    <span className="text-sm">{formatFullDate(lich.ngayChieuGioChieu)}</span>
                                                    <span className="font-bold">{formatTime(lich.ngayChieuGioChieu)}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Chọn cụm rạp để xem lịch chiếu</p>
                    )}
                </div>

                {/* Cụm rạp bên phải */}
                <div className="w-full md:w-1/3 flex flex-col gap-3">
                    {dataCinema?.map(cumRap => (
                        <div
                            key={cumRap.maCumRap}
                            onClick={() => setSelectedCumRap(cumRap.maCumRap)}
                            className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 transition ${selectedCumRap === cumRap.maCumRap
                                ? "bg-red-600"
                                : "bg-white/10 hover:bg-red-400"
                                }`}
                        >
                            {/* Logo rạp */}
                            {cumRap.logo && (
                                <img
                                    src={cumRap.logo}
                                    alt={cumRap.tenCumRap}
                                    className="w-12 h-12 object-contain rounded"
                                />
                            )}
                            <div>
                                <h4 className="font-semibold">{cumRap.tenCumRap}</h4>
                                <p className="text-sm text-gray-300">{cumRap.diaChi}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
