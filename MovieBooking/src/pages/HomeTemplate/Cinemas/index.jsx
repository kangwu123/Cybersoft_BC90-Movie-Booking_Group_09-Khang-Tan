import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaList, fetchCinema, fetchTimeShow } from "./slice";
import CinemaItem from "./CinemaItem";

export default function CinemaPage() {
    const dispatch = useDispatch();
    const { dataCinemaList, dataCinema, dataTimeShow, loading } = useSelector(s => s.cinema);

    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedCumRap, setSelectedCumRap] = useState(null);

    // Fetch hệ thống rạp
    useEffect(() => {
        dispatch(fetchCinemaList());
    }, []);

    // Khi chọn hệ thống rạp -> lấy cumRap + lịch chiếu
    useEffect(() => {
        if (selectedSystem) {
            dispatch(fetchCinema(selectedSystem));
            dispatch(fetchTimeShow(selectedSystem));
            setSelectedCumRap(null);
        }
    }, [selectedSystem]);

    // Khi đã có dataTimeShow -> xử lý để lấy danh sách lịch chiếu đúng cấu trúc API
    const allCumRap = Array.isArray(dataTimeShow)
        ? dataTimeShow.flatMap(h =>
            Array.isArray(h?.lstCumRap) ? h.lstCumRap : []
        )
        : [];

    const showTimes = selectedCumRap
        ? allCumRap
            .filter(c => c.maCumRap === selectedCumRap)
            .flatMap(c =>
                Array.isArray(c.danhSachPhim) ? c.danhSachPhim : []
            )
            .flatMap(p =>
                Array.isArray(p.lstLichChieuTheoPhim) ? p.lstLichChieuTheoPhim : []
            )
        : [];

    return (
        <div className="container mx-auto py-10 text-white">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Chọn Rạp & Lịch Chiếu
            </h1>

            {/* Hệ thống rạp */}
            <div className="flex gap-6 justify-center mb-10">
                {dataCinemaList?.map(item => (
                    <button
                        key={item.maHeThongRap}
                        onClick={() => setSelectedSystem(item.maHeThongRap)}
                        className={`px-5 py-2 rounded-full border transition
                            ${selectedSystem === item.maHeThongRap
                                ? "bg-red-500"
                                : "bg-white/10 hover:bg-red-400"
                            }`}
                    >
                        {item.tenHeThongRap}
                    </button>
                ))}
            </div>

            {/* Cụm rạp */}
            {dataCinema && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    {dataCinema.map(cumRap => (
                        <div
                            key={cumRap.maCumRap}
                            onClick={() => setSelectedCumRap(cumRap.maCumRap)}
                            className={`p-4 border rounded-lg cursor-pointer transition 
                                ${selectedCumRap === cumRap.maCumRap
                                    ? "bg-red-600"
                                    : "bg-white/10 hover:bg-red-400"
                                }`}
                        >
                            <h3 className="text-xl font-semibold">
                                {cumRap.tenCumRap}
                            </h3>
                            <p className="text-sm text-gray-300">
                                {cumRap.diaChi}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Lịch chiếu */}
            {selectedCumRap && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Lịch chiếu</h2>

                    {showTimes.length === 0 && (
                        <p className="text-gray-400">Không có lịch chiếu.</p>
                    )}

                    {showTimes.map(item => (
                        <CinemaItem key={item.maLichChieu} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
