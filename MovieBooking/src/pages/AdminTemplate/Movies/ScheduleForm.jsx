import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHeThongRap, fetchCumRap, createSchedule } from '../../AdminTemplate/TimeShow/slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const ScheduleForm = ({ movie, onClose, onSaved }) => {
    const dispatch = useDispatch()
    const { heThongRap, cumRap } = useSelector(s => s.timeshow)
    const [selectedHeThong, setSelectedHeThong] = useState('')

    useEffect(() => { dispatch(fetchHeThongRap()) }, [dispatch])

    useEffect(() => {
        if (selectedHeThong) dispatch(fetchCumRap(selectedHeThong))
    }, [selectedHeThong, dispatch])

    const formik = useFormik({
        initialValues: { maHeThongRap: '', maCumRap: '', maRap: '', ngayGioChieu: '', giaVe: 75000 },
        validationSchema: Yup.object({ maHeThongRap: Yup.string().required(), maCumRap: Yup.string().required(), maRap: Yup.string().required(), ngayGioChieu: Yup.string().required(), giaVe: Yup.number().min(0) }),
        onSubmit: async (values) => {
            try {
                // API expects: {MaPhim, NgayChieuGioChieu, MaRap, GiaVe}
                const payload = {
                    MaPhim: movie.maPhim,
                    NgayChieuGioChieu: new Date(values.ngayGioChieu).toISOString(),
                    MaRap: values.maRap,
                    GiaVe: values.giaVe
                }
                await dispatch(createSchedule(payload)).unwrap()
                if (onSaved) onSaved()
            } catch (err) { console.error(err) }
        }
    })

    useEffect(() => {
        if (heThongRap?.length) {
            formik.setFieldValue('maHeThongRap', heThongRap[0].maHeThongRap)
            setSelectedHeThong(heThongRap[0].maHeThongRap)
        }
    }, [heThongRap])

    const onHeThongChange = (e) => {
        const val = e.target.value
        setSelectedHeThong(val)
        formik.setFieldValue('maHeThongRap', val)
        formik.setFieldValue('maCumRap', '')
        formik.setFieldValue('maRap', '')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Create Schedule for: {movie.tenPhim}</h3>
                    <button onClick={onClose} className="text-gray-600">Close</button>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm">Cinema System</label>
                            <select name="maHeThongRap" value={formik.values.maHeThongRap} onChange={onHeThongChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded">
                                <option value="">Select system</option>
                                {heThongRap?.map(h => <option key={h.maHeThongRap} value={h.maHeThongRap}>{h.tenHeThongRap}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm">Cinema Cluster</label>
                            <select name="maCumRap" value={formik.values.maCumRap} onChange={(e) => { formik.setFieldValue('maCumRap', e.target.value) }} className="w-full p-2 border border-gray-300 bg-white text-black rounded">
                                <option value="">Select cluster</option>
                                {cumRap?.map(c => <option key={c.maCumRap} value={c.maCumRap}>{c.tenCumRap}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm">Room (Rạp)</label>
                            <select name="maRap" value={formik.values.maRap} onChange={(e) => formik.setFieldValue('maRap', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded">
                                <option value="">Select room</option>
                                {cumRap?.find(c => c.maCumRap === formik.values.maCumRap)?.danhSachRap?.map(r => (
                                    <option key={r.maRap} value={r.maRap}>{r.tenRap}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm">Date & Time</label>
                            <input type="datetime-local" name="ngayGioChieu" value={formik.values.ngayGioChieu} onChange={(e) => formik.setFieldValue('ngayGioChieu', e.target.value)} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                        </div>

                        <div>
                            <label className="block text-sm">Price</label>
                            <input type="number" name="giaVe" value={formik.values.giaVe} onChange={(e) => formik.setFieldValue('giaVe', Number(e.target.value))} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Create Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ScheduleForm
