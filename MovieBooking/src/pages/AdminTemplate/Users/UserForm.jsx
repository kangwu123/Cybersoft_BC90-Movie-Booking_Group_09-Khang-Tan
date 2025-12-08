import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { addUser, updateUser } from './slice'

const UserForm = ({ initialValues = null, onClose, onSaved }) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValues || { taiKhoan: '', matKhau: '', hoTen: '', email: '', soDT: '', maLoaiNguoiDung: 'KhachHang', maNhom: 'GP03' },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Account required'),
            matKhau: initialValues ? Yup.string().notRequired() : Yup.string().required('Password required'),
            hoTen: Yup.string().required('Full name required'),
            email: Yup.string().email('Invalid email').required('Email required'),
            soDT: Yup.string().required('Phone required'),
        }),
        onSubmit: async (values) => {
            try {
                const payload = { ...values }
                if (initialValues && initialValues.taiKhoan) {
                    await dispatch(updateUser(payload)).unwrap()
                } else {
                    await dispatch(addUser(payload)).unwrap()
                }
                if (onSaved) onSaved()
            } catch (err) { console.error(err) }
        }
    })

    useEffect(() => {
        if (initialValues) formik.setValues({ ...initialValues, maNhom: initialValues.maNhom || 'GP03' })
    }, [initialValues])

    return (
        <form onSubmit={formik.handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-black">Account</label>
                    <input name="taiKhoan" value={formik.values.taiKhoan} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" disabled={!!initialValues} />
                    {formik.touched.taiKhoan && formik.errors.taiKhoan && <div className="text-red-500 text-sm">{formik.errors.taiKhoan}</div>}
                </div>

                <div>
                    <label className="block text-sm text-black">Password</label>
                    <input name="matKhau" type="password" value={formik.values.matKhau} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.matKhau && formik.errors.matKhau && <div className="text-red-500 text-sm">{formik.errors.matKhau}</div>}
                </div>

                <div>
                    <label className="block text-sm text-black">Full Name</label>
                    <input name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.hoTen && formik.errors.hoTen && <div className="text-red-500 text-sm">{formik.errors.hoTen}</div>}
                </div>

                <div>
                    <label className="block text-sm text-black">Email</label>
                    <input name="email" value={formik.values.email} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
                </div>

                <div>
                    <label className="block text-sm text-black">Phone</label>
                    <input name="soDT" value={formik.values.soDT} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                    {formik.touched.soDT && formik.errors.soDT && <div className="text-red-500 text-sm">{formik.errors.soDT}</div>}
                </div>

                <div>
                    <label className="block text-sm text-black">Role</label>
                    <select name="maLoaiNguoiDung" value={formik.values.maLoaiNguoiDung} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded">
                        <option value="QuanTri">Admin</option>
                        <option value="KhachHang">Customer</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            </div>
        </form>
    )
}

export default UserForm
