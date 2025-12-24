import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addMovie, updateMovie } from './slice';

const MovieForm = ({ initialValues = null, onClose, onSaved }) => {
    const dispatch = useDispatch();
    const [dragging, setDragging] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [fileObj, setFileObj] = useState(null);

    const formik = useFormik({
        initialValues: initialValues || {
            tenPhim: '',
            biDanh: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required('Movie name is required'),
            trailer: Yup.string().url('Invalid URL').nullable(),
            moTa: Yup.string().required('Description is required'),
            ngayKhoiChieu: Yup.string().required('Release date is required'),
            danhGia: Yup.number().min(0).max(10).required('Rating required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                const formattedDate = values.ngayKhoiChieu.split('-').reverse().join('/');

                formData.append('tenPhim', values.tenPhim);
                formData.append('biDanh', values.biDanh || values.tenPhim);
                formData.append('trailer', values.trailer || '');
                formData.append('moTa', values.moTa);
                formData.append('ngayKhoiChieu', formattedDate);
                formData.append('danhGia', values.danhGia);
                formData.append('hot', values.hot);
                formData.append('dangChieu', values.dangChieu);
                formData.append('sapChieu', values.sapChieu);
                formData.append('maNhom', 'GP07');
                if (fileObj) {
                    formData.append('hinhAnh', fileObj, fileObj.name);
                }

                if (initialValues && initialValues.maPhim) {
                    // update - include maPhim
                    formData.append('maPhim', initialValues.maPhim);
                    await dispatch(updateMovie(formData)).unwrap();
                } else {
                    await dispatch(addMovie(formData)).unwrap();
                }

                if (onSaved) onSaved();
            } catch (err) {
                console.error('Save error', err);
            }
        },
    });

    useEffect(() => {
        if (initialValues) {
            formik.setValues({
                tenPhim: initialValues.tenPhim || '',
                biDanh: initialValues.biDanh || '',
                trailer: initialValues.trailer || '',
                moTa: initialValues.moTa || '',
                ngayKhoiChieu: initialValues.ngayKhoiChieu?.slice(0, 10) || '',
                dangChieu: !!initialValues.dangChieu,
                sapChieu: !!initialValues.sapChieu,
                hot: !!initialValues.hot,
                danhGia: initialValues.danhGia || 0,
            })
            if (initialValues.hinhAnh) setFilePreview(initialValues.hinhAnh)
        }
    }, [initialValues]);

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length) {
            setFileObj(files[0]);
            setFilePreview(URL.createObjectURL(files[0]));
        }
    };

    const onFileChange = (e) => {
        const f = e.target.files?.[0];
        if (f) {
            setFileObj(f);
            setFilePreview(URL.createObjectURL(f));
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-black">Movie Name</label>
                    <input name="tenPhim" value={formik.values.tenPhim} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.tenPhim && formik.errors.tenPhim ? <div className="text-red-500 text-sm">{formik.errors.tenPhim}</div> : null}
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">Trailer URL</label>
                    <input name="trailer" value={formik.values.trailer} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.trailer && formik.errors.trailer ? <div className="text-red-500 text-sm">{formik.errors.trailer}</div> : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Release Date</label>
                    <input name="ngayKhoiChieu" value={formik.values.ngayKhoiChieu} onChange={formik.handleChange} type="date" className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? <div className="text-red-500 text-sm">{formik.errors.ngayKhoiChieu}</div> : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">Rating</label>
                    <input name="danhGia" value={formik.values.danhGia} onChange={formik.handleChange} type="number" min={0} max={10} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.danhGia && formik.errors.danhGia ? <div className="text-red-500 text-sm">{formik.errors.danhGia}</div> : null}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black">Description</label>
                    <textarea name="moTa" value={formik.values.moTa} onChange={formik.handleChange} rows={4} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.moTa && formik.errors.moTa ? <div className="text-red-500 text-sm">{formik.errors.moTa}</div> : null}
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-black">Poster (drag & drop or choose)</label>
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={onDrop}
                        className={`w-full p-6 border-dashed rounded ${dragging ? 'border-indigo-400' : 'border-gray-300'}`}>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">Drop image here or click to choose</p>
                                <input type="file" accept="image/*" onChange={onFileChange} className="mt-2 bg-white text-black" />
                            </div>
                            {filePreview && (
                                <img src={filePreview} alt="preview" style={{ width: 80, height: 120, objectFit: 'cover' }} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="dangChieu" checked={formik.values.dangChieu} onChange={e => formik.setFieldValue('dangChieu', e.target.checked)} />
                        <span className="ml-2 text-black">Currently Showing</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="sapChieu" checked={formik.values.sapChieu} onChange={e => formik.setFieldValue('sapChieu', e.target.checked)} />
                        <span className="ml-2 text-black">Upcoming</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="hot" checked={formik.values.hot} onChange={e => formik.setFieldValue('hot', e.target.checked)} />
                        <span className="ml-2 text-black">Featured</span>
                    </label>
                </div>

            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-black rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            </div>
        </form>
    );
};

export default MovieForm;
