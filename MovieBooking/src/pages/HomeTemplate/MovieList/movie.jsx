import { NavLink } from 'react-router-dom';

const Movie = ({ propMovie, onOpenTrailer }) => {

    const formatFullDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const handleOpenTrailer = () => {
        onOpenTrailer(propMovie.trailer);
    };
    return (
        <>
            <div key={propMovie.maPhim}>
                <div className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg 
        hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
        transition-all duration-300 cursor-pointer p-4">

                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={propMovie.hinhAnh}
                            alt={propMovie.tenPhim}
                            className="h-100 w-full object-cover"
                        />

                        <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                            C16
                        </span>

                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                            <i className="fa-solid fa-star text-amber-400"></i>
                            <span>{propMovie.danhGia}</span>
                        </div>

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer 
                                    transition-all duration-300 hover:bg-orange-500"
                                onClick={handleOpenTrailer}>TRAILER
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col justify-between h-[150px]">
                        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                            {propMovie.tenPhim}
                        </h3>

                        <span className="text-gray-300 text-sm sm:text-md md:text-base flex items-center">
                            <span>120 Min</span>
                            <span className="w-px h-4 bg-gray-500"></span> &nbsp;
                            <span>{formatFullDate(propMovie.ngayKhoiChieu)}</span>
                        </span>

                        <NavLink
                            to={`/movie-detail/${propMovie.maPhim}`}
                            className="block w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
             hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                        >
                            Get Tickets
                        </NavLink>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Movie