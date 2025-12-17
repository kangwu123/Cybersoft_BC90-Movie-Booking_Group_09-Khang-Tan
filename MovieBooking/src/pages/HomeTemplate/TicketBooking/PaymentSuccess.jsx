import { useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const { bookingDetails, finalTotal } = location.state || {};

    if (!bookingDetails) {
        return (
            <div className="text-center p-10">
                <h1 className="text-2xl">No booking details found.</h1>
                <Link to="/" className="text-blue-500">Go to Homepage</Link>
            </div>
        );
    }
    const { thongTinPhim, selectedSeats, selectedFoods } = bookingDetails;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-amber-600 rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">Payment Successful!</h1>
            <div className="bg-amber-500 p-6 text-red-700 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{thongTinPhim.tenPhim}</h2>
                <p><strong>Theater:</strong> {thongTinPhim.tenCumRap}</p>
                <p><strong>Address:</strong> {thongTinPhim.diaChi}</p>
                <p><strong>Showtime:</strong> {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Selected Seats:</h3>
                    <p>{selectedSeats.map(s => s.tenGhe).join(', ')}</p>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Food & Drinks:</h3>
                    {selectedFoods.length > 0 ? (
                        <ul>
                            {selectedFoods.map(food => (
                                <li key={food.id}>{food.name} x{food.quantity}</li>
                            ))}
                        </ul>
                    ) : <p>None</p>}
                </div>
                <div className="mt-6 text-2xl font-bold text-right">
                    Total Paid: {finalTotal.toLocaleString()} VND
                </div>
            </div>
            <div className="text-center mt-6">
                <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-md">Back to Home</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;