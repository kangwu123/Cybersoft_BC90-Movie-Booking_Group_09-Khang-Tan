import React from 'react';
import { Film, Building, Clock, Calendar, Armchair, CupSoda, X } from 'lucide-react';

const ConfirmBookingModal = ({ onConfirm, onBack, bookingDetails }) => {
    const { thongTinPhim, selectedSeats, selectedFoods, total } = bookingDetails;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white text-gray-800 rounded-lg p-6 w-full max-w-lg">
                <button onClick={onBack} className="absolute top-4 left-4 md:top-6 md:left-6 text-gray-500 hover:text-gray-800">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Confirm Booking</h2>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold flex items-center text-black"><Film className="mr-2 text-amber-500" size={20} />Theater:</span>
                        <span className="text-gray-600">{thongTinPhim.tenCumRap}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold flex items-center text-black"><Building className="mr-2 text-amber-500" size={20} />Auditorium:</span>
                        <span className="text-gray-600">{thongTinPhim.tenRap}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold flex items-center text-black"><Clock className="mr-2 text-amber-500" size={20} />Time:</span>
                        <span className="text-gray-600">{thongTinPhim.gioChieu}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold flex items-center text-black"><Calendar className="mr-2 text-amber-500" size={20} />Date:</span>
                        <span className="text-gray-600">{thongTinPhim.ngayChieu}</span>
                    </div>
                </div>

                <hr className="my-6" />

                <div>
                    <h3 className="font-semibold mb-2 flex items-center text-black"><Armchair className="mr-2 text-amber-500" size={20} />Selected Seats</h3>
                    <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                            {selectedSeats.map((s) => (
                                <span key={s.maGhe} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                                    {s.tenGhe}
                                </span>
                            ))}
                        </div>
                        <span className="text-red-500">
                            {selectedSeats
                                .reduce((acc, s) => acc + s.giaVe, 0)
                                .toLocaleString()} đ
                        </span>
                    </div>
                </div>

                <hr className="my-6" />

                <div>
                    <h3 className="font-semibold mb-2 flex items-center text-black"><CupSoda className="mr-2 text-amber-500" size={20} />Food & Drinks</h3>
                    {selectedFoods.length > 0 ? (
                        selectedFoods.map((food) => (
                            <div key={food.id} className="flex justify-between">
                                <span className="text-gray-600">
                                    {food.name} x{food.quantity}
                                </span>
                                <span className="text-red-600">{(food.price * food.quantity).toLocaleString()} đ</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No food or drinks selected.</p>
                    )}
                </div>

                <hr className="my-6" />

                <div className="flex justify-between font-bold text-xl">
                    <span className="text-red-600">Total Payment</span>
                    <span className="text-red-500">{total.toLocaleString()} đ</span>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={onBack}
                        className="bg-gray-300 px-6 py-2 rounded-lg"
                    >
                        Back
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg"
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBookingModal;