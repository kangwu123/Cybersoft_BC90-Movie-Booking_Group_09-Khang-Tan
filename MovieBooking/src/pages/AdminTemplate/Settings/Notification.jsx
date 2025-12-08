import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateNotifications } from './slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Notification = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(s => s.settings.notifications)

  const formik = useFormik({
    initialValues: { ...notifications },
    validationSchema: Yup.object({ thresholdBooking: Yup.number().min(0), thresholdRevenue: Yup.number().min(0) }),
    onSubmit(values) {
      dispatch(updateNotifications(values))
    }
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-xl bg-white p-4 rounded">
        <label className="flex items-center gap-3 mb-3">
          <input type="checkbox" checked={formik.values.bookingAmount} onChange={(e) => formik.setFieldValue('bookingAmount', e.target.checked)} />
          <span className="text-black">Enable booking amount notifications</span>
        </label>

        <label className="flex items-center gap-3 mb-3">
          <input type="checkbox" checked={formik.values.revenue} onChange={(e) => formik.setFieldValue('revenue', e.target.checked)} />
          <span className="text-black">Enable revenue notifications</span>
        </label>

        <div className="mb-3">
          <label className="block text-sm text-black">Booking threshold</label>
          <input type="number" name="thresholdBooking" value={formik.values.thresholdBooking} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
        </div>

        <div className="mb-3">
          <label className="block text-sm text-black">Revenue threshold</label>
          <input type="number" name="thresholdRevenue" value={formik.values.thresholdRevenue} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  )
}

export default Notification