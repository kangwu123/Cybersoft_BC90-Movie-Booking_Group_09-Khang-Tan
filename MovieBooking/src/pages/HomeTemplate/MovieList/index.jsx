import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchMovieList } from './slice'
import Movie from './movie'
import Trailer from './Trailer';

const MovieList = () => {
    const dispatch = useDispatch()
    const [trailerUrl, setTrailerUrl] = React.useState('');

    const handleOpenTrailer = (url) => {
        setTrailerUrl(url);
    };

    const handleCloseTrailer = () => {
        setTrailerUrl('');
    };

    const state = useSelector((state) => state.movieListReducer)

    useEffect(() => {
        dispatch(fetchMovieList())
    }, [])

    const { data, loading } = state

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
                <div className="animate-pulse space-y-3">
                    <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="animate-pulse space-y-3">
                    <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
                    <div className="h-4 bg-gray-200 rounded w-3/5" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        );
    }

    const renderNowMovieList = () => {
        return data?.map((movie) => {
            if (movie.dangChieu) {
                return <Movie key={movie.maPhim} propMovie={movie} onOpenTrailer={handleOpenTrailer} />
            }
        });
    };

    const renderUpComingMovieList = () => {
        return data?.map((movie) => {
            if (!movie.dangChieu) {
                return <Movie key={movie.maPhim} propMovie={movie} onOpenTrailer={handleOpenTrailer} />
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
                {trailerUrl && <Trailer propTrailer={trailerUrl} onClose={handleCloseTrailer} />}
            </div>
        </div>
    )
}

export default MovieList