import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLocation, updateLocation, deleteLocation } from './slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Location = () => {
  const dispatch = useDispatch()
  const locations = useSelector(s => s.settings.locations)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)

  const formik = useFormik({
    initialValues: { id: '', name: '', address: '', mapLink: '' },
    validationSchema: Yup.object({ name: Yup.string().required('Required'), address: Yup.string().required('Required') }),
    onSubmit(values) {
      if (editing) dispatch(updateLocation(values))
      else dispatch(addLocation({ ...values, id: Date.now().toString() }))
      setShowModal(false)
      setEditing(null)
    }
  })

  const onAdd = () => { setEditing(null); formik.resetForm(); setShowModal(true) }
  const onEdit = (loc) => { setEditing(loc); formik.setValues(loc); setShowModal(true) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Location Settings</h2>
        <button onClick={onAdd} className="px-4 py-2 bg-green-500 text-white rounded">Add Location</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {locations?.map(loc => (
          <div key={loc.id} className="border rounded p-4 bg-white">
            <div className="text-lg font-medium mb-2">{loc.name}</div>
            <div className="text-sm text-gray-600 mb-3">{loc.address}</div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => onEdit(loc)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
              <button onClick={() => dispatch(deleteLocation(loc.id))} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Location' : 'Add Location'}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm text-black">Name</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm text-black">Address</label>
                <input name="address" value={formik.values.address} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                {formik.touched.address && formik.errors.address && <div className="text-red-500 text-sm">{formik.errors.address}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm text-black">Map Link (optional)</label>
                <input name="mapLink" value={formik.values.mapLink} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setShowModal(false); setEditing(null) }} className="px-4 py-2 bg-gray-200 text-black rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Location