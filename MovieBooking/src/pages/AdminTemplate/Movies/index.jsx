import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMovieList } from '../../HomeTemplate/MovieList/slice'
import Movie from './movie'
import MovieForm from './MovieForm'
import { fetchAdminMovieList, deleteMovie, fetchMovieDetail } from './slice'

const Movies = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const state = useSelector((state) => state.movieListReducer)

    const { data, loading } = state

    useEffect(() => {
        dispatch(fetchMovieList())
        dispatch(fetchAdminMovieList())
    }, [])

    const handleEdit = async (maPhim) => {
        try {
            const res = await dispatch(fetchMovieDetail(maPhim)).unwrap()
            setEditingMovie(res)
            setShowModal(true)
        } catch (err) {
            console.error('Failed to fetch movie detail', err)
        }
    }

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
                return <Movie key={movie.maPhim} propMovie={movie}
                    onSchedule={(m) => navigate(`/admin/movies/schedule/${m.maPhim}`)}
                    onEdit={(m) => { handleEdit(m.maPhim); }}
                    onDelete={(id) => { if (window.confirm('Delete this movie?')) { dispatch(deleteMovie(id)); } }}
                />
            }
        })
    }

    const renderUpComingMovieList = () => {
        return data?.map((movie) => {
            if (!movie.dangChieu) {
                return <Movie key={movie.maPhim} propMovie={movie}
                    onSchedule={(m) => navigate(`/admin/movies/schedule/${m.maPhim}`)}
                    onEdit={(m) => { handleEdit(m.maPhim); }}
                    onDelete={(id) => { if (window.confirm('Delete this movie?')) { dispatch(deleteMovie(id)); } }}
                />
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
                    onClick={() => { setEditingMovie(null); setShowModal(true); }}>
                    Add Movie
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-blue-300 rounded-2xl shadow-xl w-full max-w-4xl relative">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-semibold text-red-600">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 text-gray-600 hover:text-red-500"><i className="fa-solid fa-x" /></button>
                        </div>
                        <MovieForm initialValues={editingMovie} onClose={() => setShowModal(false)} onSaved={() => { setShowModal(false); dispatch(fetchMovieList()); dispatch(fetchAdminMovieList()); }} />
                    </div>
                </div>
            )}

            <div className="space-y-6">
                <div className="bg-blue-300 p-6 rounded-2xl shadow-lg border border-blue-300">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Now Showing Movies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-blue-300">
                            <thead className="bg-bule-300">
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
                                        Schedule
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-blue-300 divide-y divide-blue-300">
                                {renderNowMovieList()}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-blue-300 p-6 rounded-2xl shadow-lg border border-blue-300">
                    <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">Upcoming Movies</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-blue-300">
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
                                        Schedule
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-blue-300 divide-y divide-blue-300">
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