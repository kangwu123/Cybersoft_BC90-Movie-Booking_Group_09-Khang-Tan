import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Trailer from "../MovieList/Trailer"

const MovieSlider = ({ propMovie, onOpenTrailer }) => {
    const [openTrailerModal, setOpenTrailerModal] = useState(false);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return date.toLocaleString("vi-VN", options);
    };
    const handleOpenTrailer = () => {
        if (propMovie.dangChieu) {
            onOpenTrailer(propMovie.trailer);
        } else {
            setOpenTrailerModal(true);
        }
    };

    return (
        <>
            <div key={propMovie.maPhim}>
                <div
                    className="group bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-lg 
            hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
            transition-all duration-300 cursor-pointer p-2 lg:p-3 xl:p-4"
                >
                    <div className="relative rounded-xl overflow-hidden">
                        <img
                            src={propMovie.hinhAnh}
                            alt={propMovie.tenPhim}
                            className="w-full h-60 sm:h-65 md:h-70 lg:h-75 xl:h-80 object-cover"
                        />

                        <span
                            className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-lg shadow 
            opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                        >
                            C16
                        </span>

                        <div
                            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-1 rounded-lg flex items-center gap-1 
            opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                        >
                            <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm md:text-base"></i>
                            <span className="text-[10px] sm:text-xs md:text-sm">
                                {propMovie.danhGia}
                            </span>
                        </div>

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-500"
                                onClick={handleOpenTrailer}
                            >
                                TRAILER
                            </button>
                        </div>
                    </div>

                    <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col justify-between h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
                            {propMovie.tenPhim}
                        </h3>

                        <span className="text-gray-300 text-sm sm:text-md md:text-base mt-1 mb-1 flex items-center gap-2">
                            <span>120 min</span>
                            <span className="w-px h-4 bg-gray-500"></span>
                            <span>{formatDate(propMovie.ngayKhoiChieu)}</span>
                        </span>

                        <NavLink
                            to={`/movie-detail/${propMovie.maPhim}`}
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
            hover:bg-rose-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
                        >
                            <i className="fi fi-rs-ticket-alt text-xs sm:text-sm md:text-base lg:text-base leading-none"></i>
                            <span>Get Tickets</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            {/* Modal Trailer */}
            {openTrailerModal && (
                <Trailer
                    propTrailer={propMovie.trailer}
                    onClose={() => setOpenTrailerModal(false)}
                />
            )}
        </>
    )
}

export default MovieSlider