import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRole, updateRole, deleteRole } from './slice'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const PERMISSIONS = [
  { key: 'manage_movies', label: 'Manage Movies' },
  { key: 'manage_users', label: 'Manage Users' },
  { key: 'manage_settings', label: 'Manage Settings' },
]

const System = () => {
  const dispatch = useDispatch()
  const roles = useSelector(s => s.settings.roles)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const formik = useFormik({
    initialValues: { id: '', name: '', permissions: [] },
    validationSchema: Yup.object({ name: Yup.string().required('Required') }),
    onSubmit(values) {
      if (editing) dispatch(updateRole(values))
      else dispatch(addRole({ ...values, id: Date.now().toString() }))
      setShowForm(false)
      setEditing(null)
    }
  })

  const onEdit = (role) => { setEditing(role); formik.setValues(role); setShowForm(true) }
  const onAdd = () => { setEditing(null); formik.resetForm(); setShowForm(true) }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">System Settings - Roles & Permissions</h2>
        <button onClick={onAdd} className="px-4 py-2 bg-green-500 text-white rounded">Add Role</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(r => (
          <div key={r.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-lg">{r.name}</div>
                <div className="text-sm text-gray-300">{r.permissions.map(p => PERMISSIONS.find(pp => pp.key === p)?.label || p).join(', ')}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(r)} className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button onClick={() => dispatch(deleteRole(r.id))} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-blue-300 rounded-lg w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-600">{editing ? 'Edit Role' : 'Add Role'}</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm text-black">Role Name</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 bg-white text-black rounded" />
                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-2 text-black">Permissions</label>
                <div className="flex flex-col gap-2">
                  {PERMISSIONS.map(p => (
                    <label key={p.key} className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={formik.values.permissions.includes(p.key)} onChange={(e) => {
                        const next = e.target.checked ? [...formik.values.permissions, p.key] : formik.values.permissions.filter(x => x !== p.key)
                        formik.setFieldValue('permissions', next)
                      }} />
                      <span className="text-black">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-4 py-2 bg-gray-200 text-black rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default System