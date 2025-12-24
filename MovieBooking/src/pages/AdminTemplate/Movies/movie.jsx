const Movie = ({ propMovie, onSchedule, onEdit, onDelete }) => {
    return (
        <tr key={propMovie.maPhim} className="hover:bg-gray-50 transition-colors duration-300">
            <td className="px-6 py-4 text-sm text-black text-center font-bold">{propMovie.maPhim}</td>

            <td className="px-6 py-4 text-center">
                <img
                    src={propMovie.hinhAnh}
                    alt={propMovie.tenPhim}
                    className="w-12 h-16 object-cover rounded-lg mx-auto"
                />
            </td>

            <td className="px-6 py-4 text-sm text-black max-w-[200px] wrap-break-word whitespace-normal font-bold">
                {propMovie.tenPhim}
            </td>

            <td className="px-6 py-4 text-sm text-black text-center">
                {propMovie.ngayKhoiChieu
                    ? new Date(propMovie.ngayKhoiChieu).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    : ""}
            </td>

            <td className="px-6 py-4 text-center">
                <button onClick={() => onSchedule && onSchedule(propMovie)} className="text-green-600 hover:text-green-800 p-1 rounded-full cursor-pointer bg-gray-100 hover:bg-green-50 transition">
                    <i className="fa-regular fa-calendar"></i>
                </button>
            </td>
            <td className="px-6 py-4 text-center space-x-2">
                <button onClick={() => onEdit && onEdit(propMovie)} className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md bg-gray-100 hover:bg-indigo-50 transition">
                    <i className="fi fi-rr-edit"></i>
                </button>
                <button onClick={() => onDelete && onDelete(propMovie.maPhim)} className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md bg-gray-100 hover:bg-red-50 transition">
                    <i className="fi fi-rr-trash"></i>
                </button>   
            </td>
        </tr>
    )
}

export default Movie
