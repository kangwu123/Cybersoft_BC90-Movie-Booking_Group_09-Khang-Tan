import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchTicketBooking, toggleSeat } from "./slice";
import SeatList from "./SeatList";

export default function TicketBooking() {
    const [searchParams] = useSearchParams();
    const maLichChieu = searchParams.get("maLichChieu");
    const location = useLocation();
    const { duration } = location.state || {};

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

    const { tenPhim, tenCumRap, diaChi, gioChieu, ngayChieu, tenRap, hinhAnh } =
        seats.thongTinPhim;
    // Tính tổng tiền
    const tongTien = seats.danhSachGhe
        .filter((ghe) => selectedSeats.includes(ghe.maGhe))
        .reduce((total, ghe) => total + ghe.giaVe, 0);

    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            {/* ======================= THÔNG TIN PHIM ======================= */}
            <div className="mb-6 bg-gray-800 p-5 rounded-xl shadow-lg flow-root">
                {/* HÌNH ẢNH PHIM BÊN PHẢI */}
                <img src={hinhAnh} alt={tenPhim}
                    className="w-80 h-auto rounded-md float-right ml-4 mb-4"
                />

                {/* THÔNG TIN PHIM BÊN TRÁI */}
                <div>
                    <h2 className="text-2xl font-bold">{tenPhim}</h2>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Rạp:</span> {tenRap}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className="text-amber-400 font-semibold">Format:{" "}</span>
                        <span className="font-semibold"> &nbsp; 2D / IMAX</span>
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Địa chỉ:</span> {diaChi}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Ngày chiếu:</span> {ngayChieu}
                        &nbsp; &nbsp;
                        <span className=" text-yellow-400 font-semibold">Giờ chiếu:</span> {gioChieu}
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
                        <span className="text-yellow-400 font-semibold">
                            Thời Lượng : &nbsp;
                        </span>
                        {duration} min
                    </p>

                    <p className="text-gray-300 text-lg mt-4">
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
                    onToggleSeat={(tenGhe) => dispatch(toggleSeat(tenGhe))} // action click
                />
            </div>

            {/* Type of Seat */}
            <div className="flex flex-wrap items-center justify-center gap-10 pt-10 font-medium">
                <div className="flex items-center gap-2">
                    <i className="fi fi-ss-couch text-gray-400 text-2xl"></i>
                    <span className="text-gray-400 text-lg ml-2">Standard</span>
                </div>

                <div className="flex items-center gap-2">
                    <i className="fi fi-ss-couch text-green-600 text-2xl"></i>
                    <span className="text-green-600 text-lg ml-2">Your Seat</span>
                </div>

                <div className="flex items-center gap-2">
                    <i className="fi fi-ss-couch text-pink-600 text-2xl"></i>
                    <span className="text-pink-600 text-lg ml-2">Couple</span>
                </div>

                <div className="flex items-center gap-2">
                    <i className="fi fi-ss-couch text-orange-400 text-2xl"></i>
                    <span className="text-orange-600 text-lg ml-2">VIP</span>
                </div>

                <div className="flex items-center gap-2">
                    <i className="fi fi-ss-couch text-red-600 text-2xl"></i>
                    <span className="text-red-600 text-lg ml-2">Selected</span>
                </div>
            </div>

            {/* ======================= THANH TOÁN ======================= */}
            <div className="mt-6 bg-gray-800 p-5 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Thông tin đặt vé</h3>

                <p className="mb-2">
                    <span className="font-semibold">Ghế đã chọn:</span>{" "}
                    {selectedSeats.length > 0
                        ? seats.danhSachGhe
                            .filter((ghe) => selectedSeats.includes(ghe.maGhe))
                            .map((ghe) => ghe.tenGhe)
                            .join(", ")
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
