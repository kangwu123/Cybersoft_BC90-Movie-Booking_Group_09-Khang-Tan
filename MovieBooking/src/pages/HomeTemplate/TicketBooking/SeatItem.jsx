import { useDispatch, useSelector } from "react-redux";
import { toggleSeat } from "./slice";

export function SeatItem({ seat }) {
    const dispatch = useDispatch();
    const selectedSeats = useSelector((s) => s.ticketBooking.selectedSeats);
    const isBooked = seat.daDat;
    const isSelected = selectedSeats.includes(seat.maGhe);

    if (isBooked) {
        seatClass += "bg-gray-400 cursor-not-allowed";
    } else if (isSelected) {
        seatClass += "bg-green-500 text-white";
    } else {
        seatClass += "bg-white";
    }

    return (
        <button
            onClick={() => dispatch(toggleSeat(seat.maGhe))}
            className={`w-10 h-10 m-1 rounded-lg text-sm font-medium border
                ${seat.daDat ? "bg-gray-400 cursor-not-allowed" : "bg-white"}
                ${isSelected ? "bg-green-500 text-white" : ""}
            `}
            disabled={seat.daDat}
        >
            {seat.tenGhe}
        </button>
    );
}
