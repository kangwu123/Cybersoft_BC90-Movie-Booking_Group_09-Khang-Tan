import { useEffect ,useState } from 'react'
import { useParams } from "react-router-dom";
import { fetchMovieDetail,fetchCinemaList, fetchCinema, fetchTimeShow } from './slice'
import { useDispatch, useSelector } from 'react-redux';
import ListCinema from './ListCinema';
import Cinema from './cinema';
import TimeShow from './TimeShow';

const MovieDetail = () => {
    const { maPhim } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.movieDetailReducer);
    const [selectedMaHeThongRap, setSelectedMaHeThongRap] = useState(null);

    const { dataDetail, dataCinemaList, dataCinema, dataTimeShow, loading } = state

    useEffect(() => {
        dispatch(fetchMovieDetail(maPhim));
        dispatch(fetchCinemaList());
    }, [dispatch, maPhim]);

    const handleSelectCinemaSystem = (maHeThongRap) => {
        setSelectedMaHeThongRap(maHeThongRap);
    }
    useEffect(() => {
        if (!selectedMaHeThongRap) return;
        dispatch(fetchCinema(selectedMaHeThongRap));
        dispatch(fetchTimeShow(selectedMaHeThongRap));
    }, [dispatch, selectedMaHeThongRap]);

    if (loading) {
        return (
            <div className="p-6 space-y-6 animate-pulse">
                <div className="w-full h-80 bg-gray-300/70 rounded-xl"></div>

                <div className="h-7 bg-gray-300/70 rounded w-2/3"></div>

                <div className="space-y-3">
                    <div className="h-4 bg-gray-300/70 rounded w-full"></div>
                    <div className="h-4 bg-gray-300/70 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300/70 rounded w-4/6"></div>
                </div>

                <div className="h-12 bg-gray-300/70 rounded-xl w-40"></div>
            </div>
        )
    }

    const toEmbed = (url) => {
        if (!url) return "";
        return url.replace("youtu.be/", "www.youtube.com/embed/");
    };

    const renderListCinema = () => {
        return dataCinemaList?.map((cinema) => {
            return <ListCinema key={cinema.maHeThongRap}
                propCinema={cinema}
                onSelectedCinema={handleSelectCinemaSystem}
            />
        })
    }

    const renderEachCinemas = () => {
        return dataCinema?.map((cinema) => (
            <Cinema key={cinema.maCumRap} 
            propEachCinema={cinema} 
            onSelectEachCinema={renderTimeShow} />
        ));
    };

    const renderTimeShow = (tenRap) => {
        return dataTimeShow?.map((heThongRap) => {
            return heThongRap.lstCumRap.map((cumRap) => {
                return cumRap.danhSachPhim.map((phim) => {
                    return phim.lstLichChieuTheoPhim
                        .filter((lichChieu) => lichChieu.tenRap === tenRap)
                        .map((lichChieu) => (
                            <TimeShow
                                key={lichChieu.maLichChieu}
                                propTimeShow={lichChieu}
                            />
                        ));
                });
            });
        });
    };

    return (
        <div className="bg-white text-gray-800 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-15">

                    {/* LEFT CONTENT */}
                    <div className="lg:w-3/5 flex flex-col">

                        <h2 className="text-3xl font-bold border-t-2 border-b-2 border-red-500 py-3 mb-8">
                            {dataDetail?.tenPhim}
                        </h2>

                        <p className="bg-amber-500 text-white font-bold w-max px-4 py-1 rounded mb-10">
                            C16
                        </p>

                        <div className="mb-10">
                            <h3 className="text-xl text-red-600 font-semibold mb-3 tracking-wide uppercase">Short Description</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {dataDetail?.moTa}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl text-red-600 font-semibold mb-3 tracking-wide uppercase">Release Date</h3>
                            <p className="text-gray-700">
                                {dataDetail?.ngayKhoiChieu
                                    ? new Date(dataDetail.ngayKhoiChieu).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })
                                    : ""}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl text-red-600 font-semibold mb-3 tracking-wide uppercase">Movie Trailer</h3>
                            <iframe loading="lazy" className="w-full md:h-80 rounded" src={toEmbed(dataDetail?.trailer)} title="Trailer" allowFullScreen></iframe>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:w-2/5 flex flex-col gap-6">
                        <img src={dataDetail?.hinhAnh} alt="Movie Poster" className="rounded-lg shadow-lg w-[70%] mx-auto object-cover" />

                        <div className="flex justify-between bg-gray-100 p-4 border-t-2 border-b-2 border-red-500">
                            <div className="flex flex-col text-center">
                                <h4 className="text-red-600 font-semibold">RUNTIME</h4>
                                <p className="text-sm text-gray-700">108 mins</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <h4 className="text-red-600 font-semibold">RATING</h4>
                                <p className="text-sm text-gray-700 flex items-center gap-1">
                                    <i className="fa-solid fa-star text-yellow-500"></i>
                                    {dataDetail?.danhGia}
                                </p>

                            </div>
                            <div className="flex flex-col text-center">
                                <h4 className="text-red-600 font-semibold">FORMAT</h4>
                                <p className="text-sm text-gray-700">2D / IMAX</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SHOWTIME TABLE */}
                <div className="mt-12 space-y-6">
                    <h3 className="text-xl text-red-600 font-semibold mb-3 tracking-wide uppercase">
                        Times & Tickets
                    </h3>

                    <div className='flex flex-col'>
                        <label className="block mb-2 text-lg font-semibold text-gray-black dark:text-gray-100">
                            Cinema:
                        </label>

                        <div className="flex justify-start items-center gap-5">
                            {renderListCinema()}
                        </div>
                    </div>
                    {renderEachCinemas()}
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
