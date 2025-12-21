import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearSeats, datVe } from './slice';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bookingDetails } = location.state || {};
    const { maLichChieu } = bookingDetails.thongTinPhim;
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discountMessage, setDiscountMessage] = useState({ text: '', type: '' });

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

    const discountCodes = {
        'CYBERSOFT10': 0.1,
        'TANDEPZAI': 0.2,
        'KHANGDEPTRAI': 0.5,
    };

    const handleApplyDiscount = () => {
        const code = discountCode.trim().toUpperCase();
        if (discountCodes[code]) {
            const discountRate = discountCodes[code];
            const discountAmount = (ticketTotal + foodTotal) * discountRate;
            setTotalDiscount(discountAmount);
            setDiscountMessage({ text: 'Discount applied successfully!', type: 'success' });
        } else {
            setDiscountMessage({ text: 'Invalid discount code.', type: 'error' });
            setTotalDiscount(0);
        }
    };

    const finalTotal = ticketTotal + foodTotal - totalDiscount;

    const handlePayNow = () => {
        const danhSachVe = bookingDetails.selectedSeats.map((s) => ({ maGhe: s.maGhe, giaVe: s.giaVe }));
        dispatch(datVe({ maLichChieu, danhSachVe }))
            .unwrap()
            .then(() => {
                navigate('/payment-success', { state: { bookingDetails, finalTotal } });
            })
            .catch((err) => {
                alert('Payment failed: ' + err.message);
            });
    };

    const handleChangeSeats = () => {
        navigate(`/buy-ticket?maLichChieu=${maLichChieu}`);
    };
    const handleCancel = () => {
        dispatch(clearSeats());
        navigate(`/buy-ticket?maLichChieu=${maLichChieu}`);
    }
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
                                    <button onClick={handleChangeSeats}
                                        className="ml-2 text-blue-600 text-xs sm:text-sm font-semibold
                                        hover:text-indigo-700 duration-300 cursor-pointer">
                                        Change
                                    </button>
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
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button onClick={handleApplyDiscount} className="w-full bg-gray-800 text-white mt-2 py-2 rounded-md">
                            Apply
                        </button>
                        {discountMessage.text && (
                            <p className={`mt-2 text-sm ${discountMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {discountMessage.text}
                            </p>
                        )}
                    </div>

                    <button onClick={handlePayNow} className="w-full bg-red-600 text-white mt-6 py-3 rounded-md font-bold">
                        Pay Now ({finalTotal.toLocaleString()} VND)
                    </button>
                    <button onClick={handleCancel} className="w-full bg-gray-400 text-white mt-2 py-2 rounded-md">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;