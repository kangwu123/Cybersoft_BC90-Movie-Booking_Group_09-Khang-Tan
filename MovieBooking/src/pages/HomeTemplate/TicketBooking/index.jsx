import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchTicketBooking, toggleSeat, datVe, setFoods, clearSeats } from "./slice";
import SeatList from "./SeatList";
import FoodAndDrinkModal from "./FoodAndDrinkModal";
import ConfirmBookingModal from "./ConfirmBookingModal";
import { X } from "lucide-react";
export default function TicketBooking() {
    const [searchParams] = useSearchParams();
    const maLichChieu = searchParams.get("maLichChieu");
    const location = useLocation();
    const navigate = useNavigate();
    const { duration } = location.state || {};
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    const dispatch = useDispatch();

    const { seats, loading, selectedSeats, selectedFoods } = useSelector(
        (state) => state.ticketBooking
    );

    useEffect(() => {
        if (maLichChieu) {
            dispatch(fetchTicketBooking(maLichChieu));
        }
    }, [maLichChieu, dispatch]);

    if (loading)
        return <p className="text-white p-5">Đang tải danh sách ghế...</p>;

    if (!seats)
        return <p className="text-white p-5">Không thể tải dữ liệu phòng vé.</p>;

    const { thongTinPhim } = seats;

    const tongTien = seats.danhSachGhe
        .filter((ghe) => selectedSeats.includes(ghe.maGhe))
        .reduce((total, ghe) => total + ghe.giaVe, 0);

    const handleBooking = () => {
        if (selectedSeats.length > 0) {
            setShowFoodModal(true);
        }
    };

    const handleFoodContinue = (foods) => {
        dispatch(setFoods(foods));
        const foodTotal = foods.reduce((total, item) => total + item.price * item.quantity, 0);
        const total = tongTien + foodTotal;

        const details = {
            thongTinPhim,
            selectedSeats: seats.danhSachGhe.filter((g) => selectedSeats.includes(g.maGhe)),
            selectedFoods: foods,
            total,
        };
        setBookingDetails(details);
        setShowFoodModal(false);
        setShowConfirmModal(true);
    };

    const handleConfirmBooking = () => {
        const danhSachVe = bookingDetails.selectedSeats.map((g) => ({
            maGhe: g.maGhe,
            giaVe: g.giaVe,
        }));

        dispatch(datVe({ maLichChieu, danhSachVe }))
            .unwrap()
            .then(() => {
                setShowConfirmModal(false);
                navigate('/checkout', { state: { bookingDetails } });
            })
            .catch((err) => {
                alert("Đặt vé thất bại: " + err.message);
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            {showSuccess && (
                <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    🎉 Đặt vé thành công!
                </div>
            )}

            <div className="mb-6 bg-gray-800 p-5 rounded-xl shadow-lg flow-root">
                <img src={thongTinPhim.hinhAnh} alt={thongTinPhim.tenPhim}
                    className="w-80 h-auto rounded-md float-right ml-4 mb-4"
                />
                <div>
                    <h2 className="text-2xl font-bold">{thongTinPhim.tenPhim}</h2>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Rạp:</span> {thongTinPhim.tenRap}
                    </p>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className="text-amber-400 font-semibold">Format:{" "}</span>
                        <span className="font-semibold"> &nbsp; 2D / IMAX</span>
                    </p>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Địa chỉ:</span> {thongTinPhim.diaChi}
                    </p>
                    <p className="text-gray-300 text-lg mt-4">
                        <span className=" text-yellow-400 font-semibold">Ngày chiếu:</span> {thongTinPhim.ngayChieu}
                        &nbsp; &nbsp;
                        <span className=" text-yellow-400 font-semibold">Giờ chiếu:</span> {thongTinPhim.gioChieu}
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

            <div className="bg-gray-900 p-5 rounded-xl shadow-xl">
                <h3 className="text-xl font-semibold mb-3">Chọn ghế</h3>
                <SeatList
                    seats={seats.danhSachGhe}
                    selectedSeats={selectedSeats}
                    onToggleSeat={(tenGhe) => dispatch(toggleSeat(tenGhe))}
                />
            </div>

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

            <div className="mt-6 bg-gray-800 p-5 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Thông tin đặt vé</h3>
                <div className="flex items-center gap-4">
                    <p className="mb-2">
                        <span className="font-semibold">Ghế đã chọn:</span>{" "}
                        {selectedSeats.length > 0
                            ? seats.danhSachGhe
                                .filter((ghe) => selectedSeats.includes(ghe.maGhe))
                                .map((ghe) => ghe.tenGhe)
                                .join(", ")
                            : "Chưa chọn ghế nào"}
                    </p>
                     {selectedSeats.length > 0 && (
                        <X
                            className="cursor-pointer text-red-500 hover:text-red-700 mb-2"
                            onClick={() => dispatch(clearSeats())}
                        />
                    )}
                </div>

                <p className="text-lg font-bold text-amber-400">
                    Tổng tiền: {tongTien.toLocaleString()} VND
                </p>
                <button
                    onClick={handleBooking}
                    className={`mt-4 px-6 py-3 rounded-lg text-black font-semibold transition-all ${selectedSeats.length === 0
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-amber-400 hover:bg-amber-500"
                        }`}
                    disabled={selectedSeats.length === 0}
                >
                    Đặt vé
                </button>
            </div>

            {showFoodModal && (
                <FoodAndDrinkModal
                    onBack={() => setShowFoodModal(false)}
                    onContinue={handleFoodContinue}
                    selectedSeats={selectedSeats}
                    ticketPrice={tongTien}
                />
            )}

            {showConfirmModal && (
                <ConfirmBookingModal
                    onBack={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmBooking}
                    bookingDetails={bookingDetails}
                />
            )}
        </div>
    );
}