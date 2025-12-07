import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from './slice'
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import ListCinema from './ListCinema';
import Cinema from './Cinema';

const MovieDetail = () => {
    const { maPhim } = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.movieDetailReducer);
    const [selectedMaHeThongRap, setSelectedMaHeThongRap] = useState(null);

    const { dataDetail, loading } = state
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        dispatch(fetchMovieDetail(maPhim));
    }, [dispatch, maPhim]);

    const handleSelectCinemaSystem = (maHeThongRap) => {
        setSelectedMaHeThongRap(maHeThongRap);
    }
    useEffect(() => {
        if (!selectedMaHeThongRap) return;
    }, [dispatch, selectedMaHeThongRap]);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    if (loading || !dataDetail) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Stack spacing={2} direction="row">
                    <CircularProgress
                        enableTrackSlot
                        variant="determinate"
                        color="secondary"
                        value={progress}
                    />
                </Stack>
            </div>
        )
    }

    const parseTimeParam = (t) => {
        if (!t) return null;
        // plain seconds
        if (/^\d+$/.test(t)) return parseInt(t, 10);
        // formats like 1h2m3s or 2m30s or 90s
        const match = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
        if (!match) return null;
        const h = parseInt(match[1] || 0, 10);
        const m = parseInt(match[2] || 0, 10);
        const s = parseInt(match[3] || 0, 10);
        const total = h * 3600 + m * 60 + s;
        return total || null;
    };

    const getEmbedUrl = (url) => {
        if (!url) return "";
        try {
            // If already an embed URL, return as-is
            if (url.includes("youtube.com/embed")) return url;

            // Ensure URL has protocol for URL parsing
            const normalized = url.startsWith("http") ? url : `https://${url}`;
            const u = new URL(normalized);

            let videoId = "";

            if (u.hostname.includes("youtu.be")) {
                videoId = u.pathname.replace(/^\//, "");
            } else if (u.hostname.includes("youtube.com")) {
                // try v param first
                videoId = u.searchParams.get("v") || u.pathname.split("/").pop();
            }

            // fallback: try to find 11-char youtube id in the string
            if (!videoId) {
                const m = url.match(/([A-Za-z0-9_-]{11})/);
                if (m) videoId = m[1];
            }

            if (!videoId) return "";

            // Handle start time 't' or 'start' from query or hash
            let t = u.searchParams.get("t") || u.searchParams.get("start") || "";
            if (!t && u.hash) {
                // hash may be like #t=1m30s
                const h = u.hash.replace(/^#/, "");
                if (h.startsWith("t=")) t = h.substring(2);
            }

            const seconds = parseTimeParam(t);
            const params = seconds ? `?start=${seconds}` : "";

            return `https://www.youtube.com/embed/${videoId}${params}`;
        } catch (e) {
            // fallback: extract id from any string
            const m = url.match(/([A-Za-z0-9_-]{11})/);
            if (m) return `https://www.youtube.com/embed/${m[1]}`;
            return "";
        }
    };

    const renderListCinema = () => {
        return dataDetail?.heThongRapChieu?.map((chainCinema) => {
            return (
                <ListCinema
                    key={chainCinema.maHeThongRap}
                    propChainCinema={chainCinema}
                    onSelectedCinema={() => handleSelectCinemaSystem(chainCinema.maHeThongRap)}
                    isActive={selectedMaHeThongRap === chainCinema.maHeThongRap}
                />

            )
        })
    };


    const renderEachCinemas = () => {
        if (!selectedMaHeThongRap) return null;

        const selected = dataDetail?.heThongRapChieu?.find(
            (x) => x.maHeThongRap === selectedMaHeThongRap
        );

        return selected?.cumRapChieu?.map((cinema) => (
            <Cinema key={cinema.maCumRap} propEachCinema={cinema} />
        ));
    };

    const renderDuration = () => {
        const movieSet = new Set();
        const result = [];

        dataDetail?.heThongRapChieu?.forEach(chainCinema => {
            chainCinema?.cumRapChieu?.forEach(cinema => {
                cinema?.lichChieuPhim?.forEach(movieDetail => {
                    if (!movieSet.has(movieDetail.maPhim)) {
                        movieSet.add(movieDetail.maPhim);
                        result.push(
                            <p key={movieDetail.maPhim} className="text-sm text-gray-700">
                                {movieDetail.thoiLuong} min
                            </p>
                        );
                    }
                });
            });
        });

        return result;
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
                            <iframe loading="lazy" className="w-full md:h-80 rounded" src={getEmbedUrl(dataDetail?.trailer)} title="Trailer" allowFullScreen></iframe>
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="lg:w-2/5 flex flex-col gap-6">
                        <img src={dataDetail?.hinhAnh} alt="Movie Poster" className="rounded-lg shadow-lg w-[70%] mx-auto object-cover" />

                        <div className="flex justify-between bg-gray-100 p-4 border-t-2 border-b-2 border-red-500">
                            <div className="flex flex-col text-center">
                                <h4 className="text-red-600 font-semibold">RUNTIME</h4>
                                {renderDuration()}
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
