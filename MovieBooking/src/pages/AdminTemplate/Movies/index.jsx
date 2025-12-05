import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieList } from '../../HomeTemplate/MovieList/slice'
import Movie from './movie'

const Movies = () => {
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const state = useSelector((state) => state.movieListReducer)

    const { data, loading } = state

    useEffect(() => {
        dispatch(fetchMovieList())
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <svg
                    className="animate-spin h-10 w-10 text-indigo-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="text-gray-500 text-lg font-medium">Loading...</p>
            </div>
        )
    }

    const renderNowMovieList = () => {
        return data?.map((movie) => {
            if (movie.dangChieu) {
                return <Movie key={data.maPhim} propMovie={movie} />
            }
        })
    }

    const renderUpComingMovieList = () => {
        return data?.map((movie) => {
            if (!movie.dangChieu) {
                return <Movie key={data.maPhim} propMovie={movie} />
            }
        })
    }

    return (
        <div className="pt-0.5">
           <h1 className="text-3xl font-bold text-black dark:text-amber-600 mb-6">Movies Management</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-2/3">
                    <input
                        type="text"
                        placeholder="Search Movie..."
                        className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
                    />
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 
    hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 
    transition-all duration-300 shadow-sm cursor-pointer font-medium">
                        <i className="fi fi-rr-bars-filter"></i>
                        Filter
                    </button>
                </div>

                <button
                    className="w-full md:w-auto bg-linear-to-r from-pink-500 to-purple-500 
    hover:from-pink-600 hover:to-purple-600 text-white font-semibold 
    py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 
    focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 cursor-pointer"
                    onClick={() => setShowModal(true)}>
                    Add Movie
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-indigo-400 rounded-2xl shadow-xl w-full max-w-4xl relative">

                        {/* HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
                                Add New Movie
                            </h3>
                            <button
                                className="text-gray-500 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                <i className="fa-solid fa-x text-lg" />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="tenPhim">Movie Name</label>
                                    <input
                                        id="tenPhim"
                                        type="text"
                                        placeholder="Enter movie name"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="trailer">Trailer URL</label>
                                    <input
                                        id="trailer"
                                        type="text"
                                        placeholder="Enter trailer URL"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="hinhAnh">Image URL</label>
                                    <input
                                        id="hinhAnh"
                                        type="text"
                                        placeholder="Enter image URL"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 mb-2" htmlFor="ngayKhoiChieu">Release Date</label>
                                    <input
                                        id="ngayKhoiChieu"
                                        type="date"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="danhGia">Rating</label>
                                    <input
                                        id="danhGia"
                                        type="number"
                                        min={0}
                                        max={10}
                                        placeholder="Enter rating"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="dangChieu">Currently Showing</label>
                                    <select
                                        id="dangChieu"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="sapChieu">Upcoming</label>
                                    <select
                                        id="sapChieu"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2" htmlFor="hot">Featured</label>
                                    <select
                                        id="hot"
                                        className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="moTa">Description</label>
                                <textarea
                                    id="moTa"
                                    placeholder="Enter movie description"
                                    className="w-full px-4 py-2 border bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                                    defaultValue={""}
                                />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                className="px-5 py-2 rounded-lg bg-[#C6C6C6] hover:bg-[#AAAAAA] transition cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-rose-600 transition-all duration-300 cursor-pointer">
                                Add Movie
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Now Showing Movies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Movie ID
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Poster
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word text-center">
                                        Movie Title
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Release Date
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Showtime
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {renderNowMovieList()}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Upcoming Movies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Movie ID
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Poster
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word text-center">
                                        Movie Title
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Release Date
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Showtime
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {renderUpComingMovieList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movies
