import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingDetails } = location.state || {};
    const { userLogin } = useSelector((state) => state.user);
    const [totalDiscount, setTotalDiscount] = useState(0);

    if (!bookingDetails) {
        return (
            <div className="text-center p-10">
                <h1 className="text-2xl">No booking details found.</h1>
                <button onClick={() => navigate('/')} className="text-blue-500">
                    Go to Homepage
                </button>
            </div>
        );
    }

    const { thongTinPhim, selectedSeats, selectedFoods } = bookingDetails;

    const ticketTotal = selectedSeats.reduce((acc, s) => acc + s.giaVe, 0);
    const foodTotal = selectedFoods.reduce((acc, f) => acc + f.price * f.quantity, 0);

    const getDiscount = () => {
        if (!userLogin) return { ticketDiscount: 0, foodDiscount: 0 };

        switch (userLogin.maLoaiNguoiDung) {
            case 'U22Member':
                return { ticketDiscount: 0.05, foodDiscount: 0.03 };
            case 'VIP':
                return { ticketDiscount: 0.07, foodDiscount: 0.04 };
            case 'VVIP':
                return { ticketDiscount: 0.1, foodDiscount: 0.05 };
            default:
                return { ticketDiscount: 0, foodDiscount: 0 };
        }
    };

    const handleApplyDiscount = () => {
        const { ticketDiscount, foodDiscount } = getDiscount();
        const ticketDiscountAmount = ticketTotal * ticketDiscount;
        const foodDiscountAmount = foodTotal * foodDiscount;
        setTotalDiscount(ticketDiscountAmount + foodDiscountAmount);
    };

    const finalTotal = ticketTotal + foodTotal - totalDiscount;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-red-500 text-3xl font-bold mb-6">Review & Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="bg-yellow-400 text-red-500 p-6 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <img
                                src={thongTinPhim.hinhAnh}
                                alt={thongTinPhim.tenPhim}
                                className="w-24 h-36 rounded-md mr-6"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{thongTinPhim.tenPhim}</h2>
                                <p className="text-gray-600">
                                    {thongTinPhim.tenRap} - {thongTinPhim.tenCumRap}
                                </p>
                                <p className="text-gray-600">{thongTinPhim.diaChi}</p>
                                <div className="mt-2">
                                    <span className="font-semibold">Your Seats:</span>
                                    <span className="ml-2 text-red-500 font-bold">
                                        {selectedSeats.map((s) => s.tenGhe).join(', ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-400 text-red-500 p-6 rounded-lg shadow-md mt-6">
                        <h3 className="text-xl font-bold mb-4">Food & Drinks Ordered</h3>
                        <div className="space-y-2">
                            {selectedFoods.map((food) => (
                                <div key={food.id} className="flex justify-between">
                                    <span>
                                        {food.name} x{food.quantity}
                                    </span>
                                    <span>{(food.price * food.quantity).toLocaleString()} VND</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold mt-4">
                            <span>Subtotal</span>
                            <span>{foodTotal.toLocaleString()} VND</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-400 text-red-500 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Tickets ({selectedSeats.length})</span>
                            <span>{ticketTotal.toLocaleString()} VND</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Food & Drinks</span>
                            <span>{foodTotal.toLocaleString()} VND</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span className="text-green-500">-{totalDiscount.toLocaleString()} VND</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{finalTotal.toLocaleString()} VND</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="Enter discount code"
                            className="w-full p-2 border rounded-md"
                        />
                        <button onClick={handleApplyDiscount} className="w-full bg-gray-800 text-white mt-2 py-2 rounded-md">
                            Apply
                        </button>
                    </div>

                    <button className="w-full bg-red-600 text-white mt-6 py-3 rounded-md font-bold">
                        Pay Now ({finalTotal.toLocaleString()} VND)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;