import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import MovieLists from './../Home/MovieList.json'
const MovieList = () => {
      const renderNowMovieList = () => {
        return MovieLists.content.map((movie) => {
            if (movie.dangChieu) {
                return (
                    <div key={movie.maPhim}>
                        <div className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg 
        hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
        transition-all duration-300 cursor-pointer p-4">

                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    className="h-100 w-full object-cover"
                                />

                                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                    C16
                                </span>

                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                    <i className="fa-solid fa-star text-amber-400"></i>
                                    <span>{movie.danhGia}</span>
                                </div>

                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3
                opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button className="px-4 py-2 bg-amber-500/90 text-black font-semibold rounded-full hover:bg-red-500 transition-all duration-300 cursor-pointer">
                                        Trailer
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col justify-between h-[120px]">
                                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                                    {movie.tenPhim}
                                </h3>

                                <NavLink
                                    to={`/movie-list/${movie.maPhim}`}
                                    className="block w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
             hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                                >
                                    Movie Detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    const renderUpComingMovieList = () => {
        return MovieLists.content.map((movie) => {
            if (!movie.dangChieu) {
                return (
                    <div key={movie.maPhim}>
                        <div className="group bg-gray-900 rounded-2xl overflow-hidden shadow-lg 
        hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
        transition-all duration-300 cursor-pointer p-4">

                            <div className="relative rounded-xl overflow-hidden">
                                <img
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    className="h-100 w-full object-cover"
                                />

                                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                    C16
                                </span>

                                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded-lg flex items-center gap-1 
                opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                    <i className="fa-solid fa-star text-amber-400"></i>
                                    <span>{movie.danhGia}</span>
                                </div>

                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3
                opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button className="px-4 py-2 bg-amber-500/90 text-black font-semibold rounded-full hover:bg-red-500 transition-all duration-300 cursor-pointer">
                                        Trailer
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col justify-between h-[120px]">
                                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                                    {movie.tenPhim}
                                </h3>

                                <NavLink
                                    to={`/movie-list/${movie.maPhim}`}
                                    className="block w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
             hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                                >
                                    Movie Detail
                                </NavLink>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

  return (
      <div>
            <div className='bg-gray-100 pb-12'>
                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                            NOW SHOWING / ADVANCED SALES
                        </h2>

                        <div className='grid grid-cols-4 gap-4'>
                            {renderNowMovieList()}
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
                            UPCOMING MOVIES
                        </h2>


                        <div className='grid grid-cols-4 gap-4'>
                            {renderUpComingMovieList()}
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}

export default MovieList