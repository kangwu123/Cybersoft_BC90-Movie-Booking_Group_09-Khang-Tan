import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeThongRap, fetchCumRap, createSchedule } from '../../AdminTemplate/TimeShow/slice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ScheduleForm = ({ movie, onClose, onSaved }) => {
    const dispatch = useDispatch();
    const { heThongRap, cumRap } = useSelector(s => s.timeshow);
    const [danhSachRap, setDanhSachRap] = useState([]);

    const formik = useFormik({
        initialValues: {
            maHeThongRap: '',
            maCumRap: '',
            maRap: '',
            ngayGioChieu: '',
            giaVe: 75000,
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
                const payload = {
                    maPhim: movie.maPhim,
                    ngayChieuGioChieu: new Date(values.ngayGioChieu).toISOString(),
                    maRap: values.maRap,
                    giaVe: values.giaVe,
                };
                await dispatch(createSchedule(payload)).unwrap();
                if (onSaved) onSaved();
                onClose();
            } catch (err) {
                console.error('Failed to create schedule:', err);
            }
        },
    });

    const { values, setFieldValue, handleChange } = formik;

    // Fetch cinema systems on component mount
    useEffect(() => {
        dispatch(fetchHeThongRap());
    }, [dispatch]);

    // When the selected cinema system changes, fetch its clusters
    useEffect(() => {
        if (values.maHeThongRap) {
            dispatch(fetchCumRap(values.maHeThongRap));
        } else {
            setFieldValue('maCumRap', '');
        }
    }, [values.maHeThongRap, dispatch, setFieldValue]);

    // When system list loads, auto-select the first one
    useEffect(() => {
        if (heThongRap?.length > 0) {
            setFieldValue('maHeThongRap', heThongRap[0].maHeThongRap);
        }
    }, [heThongRap, setFieldValue]);

    // When cluster list loads, auto-select the first one
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

    // When room list is derived, auto-select the first one
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="text-gray-950 bg-blue-400 rounded-lg w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-red-600">Create Schedule: {movie.tenPhim}</h3>
                    <button onClick={onClose} className="text-gray-600">Close</button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-950">Cinema System</label>
                            <select name="maHeThongRap" value={values.maHeThongRap} onChange={handleHeThongChange} className="w-full p-2 border border-gray-300 text-black rounded">
                                <option value="">Select system</option>
                                {heThongRap?.map(h => <option key={h.maHeThongRap} value={h.maHeThongRap}>{h.tenHeThongRap}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-950">Cinema Cluster</label>
                            <select name="maCumRap" value={values.maCumRap} onChange={handleCumRapChange} className="w-full p-2 border border-gray-300 text-black rounded" disabled={!values.maHeThongRap}>
                                <option value="">Select cluster</option>
                                {cumRap?.map(c => <option key={c.maCumRap} value={c.maCumRap}>{c.tenCumRap}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-950">Room (Rạp)</label>
                            <select name="maRap" value={values.maRap} onChange={handleChange} className="w-full p-2 border border-gray-300 text-black rounded" disabled={!values.maCumRap}>
                                <option value="">Select room</option>
                                {danhSachRap.map(r => (
                                    <option key={r.maRap} value={r.maRap}>{r.tenRap}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-950">Date & Time</label>
                            <input type="datetime-local" name="ngayGioChieu" value={values.ngayGioChieu} onChange={handleChange} className="w-full p-2 border border-gray-300 text-black rounded" />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-950">Price</label>
                            <input type="number" name="giaVe" value={values.giaVe} onChange={handleChange} className="w-full p-2 border border-gray-300 text-black rounded" />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Create Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleForm;