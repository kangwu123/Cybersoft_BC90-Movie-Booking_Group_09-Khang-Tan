import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addLogo, updateLogo, deleteLogo } from './slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Logo = () => {
  const dispatch = useDispatch()
  const logos = useSelector(s => s.settings.logos)
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const formik = useFormik({
    initialValues: { id: '', name: '', url: '' },
    validationSchema: Yup.object({ name: Yup.string().required('Required') }),
    onSubmit(values) {
      if (editing) {
        dispatch(updateLogo(values))
      } else {
        dispatch(addLogo({ ...values, id: Date.now().toString() }))
      }
      setShowModal(false)
      setEditing(null)
    }
  })

  const onFileChange = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.onload = () => {
        formik.setFieldValue('url', reader.result)
      }
      reader.readAsDataURL(f)
    }
  }

  const onEdit = (logo) => {
    setEditing(logo)
    formik.setValues(logo)
    setShowModal(true)
  }

  const onAdd = () => {
    setEditing(null)
    formik.resetForm()
    setShowModal(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Logo Cinema Settings</h2>
        <button onClick={onAdd} className="px-4 py-2 bg-green-500 text-white rounded">Add Logo</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {logos?.map(logo => (
          <div key={logo.id} className="border rounded p-3 bg-white">
            <div className="h-28 flex items-center justify-center mb-2 bg-gray-50">
              {logo.url ? <img src={logo.url} alt={logo.name} className="max-h-24" /> : <div className="text-gray-400">No Image</div>}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{logo.name}</div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(logo)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button onClick={() => dispatch(deleteLogo(logo.id))} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-blue-300 rounded-lg w-full max-w-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-600">{editing ? 'Edit Logo' : 'Add Logo'}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm text-black">Name</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} className="w-full p-2 border border-gray-300  text-black rounded" />
                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm text-black">Upload</label>
                <input type="file" accept="image/*" onChange={onFileChange} className="bg-white text-black" />
                {formik.values.url && <img src={formik.values.url} alt="preview" className="mt-2 h-24" />}
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

export default Logo