import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeThongRap, fetchCumRap, createSchedule } from '../../AdminTemplate/TimeShow/slice';
import { fetchMovieList } from '../../HomeTemplate/MovieList/slice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';

const ScheduleForm = () => {
    const { maPhim } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { heThongRap, cumRap } = useSelector(s => s.timeshow);
    const { data: movieList } = useSelector(s => s.movieListReducer);
    const [movie, setMovie] = useState(null);
    const [danhSachRap, setDanhSachRap] = useState([]);
    const [hinhAnh, setHinhAnh] = useState(null);

    useEffect(() => {
        if (maPhim) {
            api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
                .then(response => {
                    setMovie(response.data.content);
                })
                .catch(error => {
                    console.error('Failed to fetch movie details:', error);
                });
        } else {
            dispatch(fetchMovieList());
        }
    }, [maPhim, dispatch]);

    const formik = useFormik({
        initialValues: {
            maHeThongRap: '',
            maCumRap: '',
            maRap: '',
            ngayGioChieu: '',
            giaVe: '',
        },
        validationSchema: Yup.object({
            maHeThongRap: Yup.string().required('Cinema System is required'),
            maCumRap: Yup.string().required('Cinema Cluster is required'),
            maRap: Yup.string().required('Room is required'),
            ngayGioChieu: Yup.string().required('Date & Time is required'),
            giaVe: Yup.number().min(75000).required('Price is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (!movie) {
                    alert('Vui lòng chọn phim!');
                    return;
                }

                const [datePart, timePart] = values.ngayGioChieu.split('T');
                const [year, month, day] = datePart.split('-');
                const [hours, minutes] = timePart.split(':');
                const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:00`;
                const payload = {
                    maPhim: movie.maPhim,
                    ngayChieuGioChieu: formattedDate,
                    maRap: values.maRap,
                    giaVe: values.giaVe,
                };
                await dispatch(createSchedule(payload)).unwrap();
                navigate('/admin/movies');
            } catch (err) {
                console.error('Failed to create schedule:', err);
            }
        },
    });

    const { values, setFieldValue, handleChange } = formik;

    useEffect(() => {
        dispatch(fetchHeThongRap());
    }, [dispatch]);

    useEffect(() => {
        if (values.maHeThongRap) {
            dispatch(fetchCumRap(values.maHeThongRap));
        } else {
            setFieldValue('maCumRap', '');
        }
    }, [values.maHeThongRap, dispatch, setFieldValue]);

    useEffect(() => {
        if (heThongRap?.length > 0) {
            setFieldValue('maHeThongRap', heThongRap[0].maHeThongRap);
        }
    }, [heThongRap, setFieldValue]);

    useEffect(() => {
        if (cumRap?.length > 0) {
            setFieldValue('maCumRap', cumRap[0].maCumRap);
        } else {
            setFieldValue('maCumRap', '');
        }
    }, [cumRap, setFieldValue]);

    useEffect(() => {
        const selectedCluster = cumRap?.find(c => c.maCumRap === values.maCumRap);
        setDanhSachRap(selectedCluster?.danhSachRap || []);
    }, [values.maCumRap, cumRap]);

    useEffect(() => {
        if (danhSachRap.length > 0) {
            setFieldValue('maRap', danhSachRap[0].maRap);
        } else {
            setFieldValue('maRap', '');
        }
    }, [danhSachRap, setFieldValue]);

    const handleHeThongChange = (e) => {
        const { value } = e.target;
        setFieldValue('maHeThongRap', value);
        setFieldValue('maCumRap', '');
        setFieldValue('maRap', '');
    };

    const handleCumRapChange = (e) => {
        const { value } = e.target;
        setFieldValue('maCumRap', value);
        setFieldValue('maRap', '');
    };

    const handleMovieChange = (e) => {
        const selectedMaPhim = e.target.value;
        if (selectedMaPhim) {
            const selectedMovie = movieList.find(m => m.maPhim == selectedMaPhim);
            setMovie(selectedMovie);
        } else {
            setMovie(null);
        }
    };

    if ((!movie && maPhim) || (!movieList && !maPhim)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 min-h-screen">
            <div className="bg-blue-300 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-amber-600">Tạo lịch chiếu - {movie ? movie.tenPhim : 'Chọn phim mới'}</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        {movie && (
                            <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-full h-auto rounded-lg shadow-lg" />
                        )}
                    </div>
                    <div className={movie ? "w-full md:w-2/3" : "w-full"}>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            {!maPhim && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Chọn phim</label>
                                    <select
                                        name="maPhim"
                                        onChange={handleMovieChange}
                                        className="mt-1 block w-full p-2 border border-amber-500 bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        defaultValue=""
                                    >
                                        <option value="">-- Vui lòng chọn phim --</option>
                                        {movieList?.map(m => (
                                            <option key={m.maPhim} value={m.maPhim}>{m.tenPhim}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hệ thống rạp</label>
                                <select name="maHeThongRap" value={values.maHeThongRap} onChange={handleHeThongChange} className="mt-1 block w-full p-2 border border-amber-500 bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Chọn hệ thống rạp</option>
                                    {heThongRap?.map(h => <option key={h.maHeThongRap} value={h.maHeThongRap}>{h.tenHeThongRap}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cụm rạp</label>
                                <select name="maCumRap" value={values.maCumRap} onChange={handleCumRapChange} className="mt-1 block w-full p-2 border border-amber-500  bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={!values.maHeThongRap}>
                                    <option value="">Chọn cụm rạp</option>
                                    {cumRap?.map(c => <option key={c.maCumRap} value={c.maCumRap}>{c.tenCumRap}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rạp</label>
                                <select name="maRap" value={values.maRap} onChange={handleChange} className="mt-1 block w-full p-2 border border-amber-500  bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" disabled={!values.maCumRap}>
                                    <option value="">Chọn rạp</option>
                                    {danhSachRap.map(r => <option key={r.maRap} value={r.maRap}>{r.tenRap}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ngày chiếu giờ chiếu</label>
                                <input type="datetime-local" name="ngayGioChieu" value={values.ngayGioChieu} onChange={handleChange} className="mt-1 block w-full p-2 border border-amber-500  bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá vé</label>
                                <input type="number" name="giaVe" value={values.giaVe} onChange={handleChange} className="mt-1 block w-full p-2 border border-amber-500  bg-white text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => navigate('/admin/movies')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Hủy</button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    disabled={!formik.isValid || !movie}
                                >
                                    Tạo lịch chiếu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleForm;