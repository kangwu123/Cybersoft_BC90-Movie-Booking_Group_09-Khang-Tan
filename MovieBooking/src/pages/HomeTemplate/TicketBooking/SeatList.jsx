export default function SeatList({ seats, selectedSeats, onToggleSeat }) {
    return (
        <div className="w-full flex flex-col items-center">

            {/* SCREEN */}
            <div className="w-3/4 bg-gray-300 h-6 rounded-t-xl shadow-inner mb-8">
                <p className="text-center text-black text-sm font-semibold mt-1">
                    MÀN HÌNH
                </p>
            </div>

            {/* DANH SÁCH GHẾ */}
            <div className="inline-block p-4 bg-white/10 rounded-xl">
                <div className="grid grid-cols-12 gap-3">

                    {seats.map((ghe) => (
                        <button
                            key={ghe.maGhe}
                            onClick={() => onToggleSeat(ghe.maGhe)}
                            disabled={ghe.daDat}
                            className={`w-10 h-10 flex items-center justify-center rounded-md border 
                                ${ghe.daDat
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : selectedSeats.includes(ghe.maGhe)
                                        ? "bg-green-500 text-white"
                                        : "bg-white text-black"
                                }`}
                        >
                            {ghe.tenGhe}
                        </button>
                    ))}

                </div>
            </div>
        </div>
    );
}