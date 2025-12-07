export default function SeatList({ seats, selectedSeats, onToggleSeat }) {
    const handleSelectSeat = (seat) => {
        // Pass the seat id (maGhe) to the parent handler so the Redux reducer
        // keeps `selectedSeats` as an array of ids (consistent with `slice.js`).
        onToggleSeat(seat.maGhe);
    }

    const renderSeats = () => {
        return seats.map((seat) => {
            const isActive = selectedSeats.includes(seat.maGhe);

            const getSeatColor = () => {
                const seatNum = parseInt(seat.tenGhe, 10);
                if (seat.daDat) return "text-red-700";
                if (isActive) return "text-green-600";
                if (seatNum >= 145 && seatNum <= 160) return "text-pink-600 hover:text-lime-400";
                if (seat.loaiGhe === "Vip") return "text-orange-600 hover:text-lime-400";
                return "text-gray-400 hover:text-lime-400";
            };

            return (
                <button
                    key={seat.tenGhe}
                    disabled={seat.daDat}
                    onClick={() => !seat.daDat && handleSelectSeat(seat)}
                    className={`
                    relative flex items-center justify-center
                    transition-all duration-300 active:scale-95
                    px-3
                    ${seat.daDat ? "cursor-not-allowed" : "cursor-pointer"}
                `}
                >
                    <i
                        className={`
                        fa-solid fa-couch text-3xl transition-colors duration-300
                        ${getSeatColor()}
                    `}
                    ></i>

                    <span className="absolute text-black font-semibold text-sm pointer-events-none">
                        {seat.tenGhe}
                    </span>
                </button>
            );
        });
    };

    return (
        <div className="w-full flex flex-col items-center">

            {/* SCREEN */}
            <div className="w-3/4 bg-gray-300 h-6 rounded-t-xl shadow-inner mb-8">
                <p className="text-center text-black text-sm font-semibold mt-1">
                    MÀN HÌNH
                </p>
            </div>

            {/* EXIT */}
            <div className="w-full flex justify-between">
                {/* LEFT EXIT */}
                <div className="bg-green-500 text-white px-4 py-1 font-semibold rounded-lg border border-green-800 shadow-md">
                    EXIT
                </div>
    
                {/* RIGHT EXIT */}
                <div className="bg-green-500 text-white px-4 py-1 font-semibold rounded-lg border border-green-800 shadow-md">
                    EXIT
                </div>

            </div>
            {/* DANH SÁCH GHẾ */}
            <div className="inline-block p-4 bg-white/10 rounded-xl">
                <div className="grid grid-cols-12 gap-3">
                    {renderSeats()}
                </div>
            </div>
        </div>
    );
}