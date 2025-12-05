import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchTicketBooking, toggleSeat } from "./slice";
import SeatList from "./SeatList";

export default function TicketBooking() {
    const [searchParams] = useSearchParams();
    const maLichChieu = searchParams.get("maLichChieu");

    const dispatch = useDispatch();

    // Lấy dữ liệu từ Redux
    const { seats, loading, selectedSeats } = useSelector(
        (state) => state.ticketBooking
    );

    // Gọi API lấy danh sách ghế
    useEffect(() => {
        if (maLichChieu) {
            dispatch(fetchTicketBooking(maLichChieu));
        }
    }, [maLichChieu, dispatch]);

    if (loading)
        return <p className="text-white p-5">Đang tải danh sách ghế...</p>;

    if (!seats)
        return <p className="text-white p-5">Không thể tải dữ liệu phòng vé.</p>;

    // Tính tổng tiền
    const tongTien = seats.danhSachGhe
        .filter((ghe) => selectedSeats.includes(ghe.maGhe))
        .reduce((total, ghe) => total + ghe.giaVe, 0);

    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
           {/* ======================= THÔNG TIN PHIM ======================= */}
            <div className="mb-6 bg-gray-800 p-5 rounded-xl shadow-lg flow-root">
                {/* HÌNH ẢNH PHIM BÊN PHẢI */}
                <img src={seats.thongTinPhim.hinhAnh} alt={seats.thongTinPhim.tenPhim}
                    className="w-80 h-auto rounded-md float-right ml-4 mb-4"
                />

                {/* THÔNG TIN PHIM BÊN TRÁI */}
                <div>
                    <h2 className="text-2xl font-bold">{seats.thongTinPhim.tenPhim}</h2>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Rạp:</span> {seats.thongTinPhim.tenCumRap}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Địa chỉ:</span> {seats.thongTinPhim.diaChi}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Ngày chiếu:</span> {seats.thongTinPhim.ngayChieu}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Giờ chiếu:</span> {seats.thongTinPhim.gioChieu}
                    </p>

                    <p className="text-yellow-400 font-semibold mt-4">
                        Mã lịch chiếu: {maLichChieu}
                    </p>
                </div>
            </div>

            {/* ======================= KHU VỰC GHẾ ======================= */}
            <div className="bg-gray-900 p-5 rounded-xl shadow-xl">
                <h3 className="text-xl font-semibold mb-3">Chọn ghế</h3>

                <SeatList
                    seats={seats.danhSachGhe}              // danh sách ghế đúng từ API
                    selectedSeats={selectedSeats}          // danh sách ghế đã chọn
                    onToggleSeat={(maGhe) => dispatch(toggleSeat(maGhe))} // action click
                />
            </div>

            {/* ======================= THANH TOÁN ======================= */}
            <div className="mt-6 bg-gray-800 p-5 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Thông tin đặt vé</h3>

                <p className="mb-2">
                    <span className="font-semibold">Ghế đã chọn:</span>{" "}
                    {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "Chưa chọn ghế nào"}
                </p>

                <p className="text-lg font-bold text-amber-400">
                    Tổng tiền: {tongTien.toLocaleString()} VND
                </p>

                <button
                    className={`mt-4 px-6 py-3 rounded-lg text-black font-semibold transition-all ${selectedSeats.length === 0
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-amber-400 hover:bg-amber-500"
                        }`}
                    disabled={selectedSeats.length === 0}
                >
                    Đặt vé
                </button>
            </div>
        </div>
    );
}
