import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, deleteUser } from './slice'
import User from './user'
import UserForm from './UserForm'

const Users = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const dispatch = useDispatch()

    const stateUser = useSelector((state) => state.userManageReducer)

    const { dataUsers, loading } = stateUser

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    const quanTriUsers = dataUsers?.filter(user => user.maLoaiNguoiDung === 'QuanTri');
    const khachHangUsers = dataUsers?.filter(user => user.maLoaiNguoiDung === 'KhachHang');

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <svg
                    className="animate-spin h-10 w-10 text-indigo-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="text-gray-500 text-lg font-medium">Loading...</p>
            </div>
        )
    }

    const renderUsers = (users) => {
        return users?.map((user) => {
            return <User key={user.taiKhoan} propUser={user} onEdit={(u) => { setEditingUser(u); setShowUserModal(true) }} onDelete={async (taiKhoan) => { if (confirm('Delete user?')) { await dispatch(deleteUser(taiKhoan)).unwrap(); dispatch(fetchUserData()) } }} />
        })
    }

    return (
        <div className="pt-0.5">
            {/* Title */}
            <h1 className="text-3xl font-bold text-black dark:text-amber-600 mb-6">User Management</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex w-full md:w-1/2 gap-2">
                    <input
                        type="text"
                        placeholder="Search User..."
                        className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
                    />
                    <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 
    hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 
    transition-all duration-500 shadow-sm cursor-pointer font-medium">
                        <i className="fi fi-rr-bars-filter"></i>
                        Filter
                    </button>
                </div>

                <button className="w-full md:w-auto bg-linear-to-r from-green-400 to-teal-500 
    hover:from-green-500 hover:to-teal-600 text-white font-semibold 
    py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 cursor-pointer"
                    onClick={() => { setEditingUser(null); setShowUserModal(true); }}
                >
                    Add User
                </button>
            </div>
            {showUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-blue-300 rounded-2xl shadow-xl w-full max-w-3xl relative">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-semibold text-red-600">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => { setShowUserModal(false); setEditingUser(null) }} className="p-2 text-gray-600 hover:text-red-500"><i className="fa-solid fa-x" /></button>
                        </div>
                        <UserForm initialValues={editingUser} onClose={() => { setShowUserModal(false); setEditingUser(null) }} onSaved={() => { setShowUserModal(false); setEditingUser(null); dispatch(fetchUserData()) }} />
                    </div>
                </div>
            )}

            <div className="bg-blue-300 p-6 rounded-lg shadow-lg overflow-x-auto mb-6">
                <h2 className="text-2xl font-bold text-black dark:text-amber-600 mb-4">Quản Trị</h2>
                <table className="min-w-full divide-y divide-blue-300">
                    <thead className="bg-blue-300">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[150px] wrap-break-word">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[120px] wrap-break-wordword">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[100px] wrap-break-word">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-blue-300 divide-y divide-blue-300">
                        {renderUsers(quanTriUsers)}
                    </tbody>
                </table>
            </div>

            <div className="bg-blue-300 p-6 rounded-lg shadow-lg overflow-x-auto">
                <h2 className="text-2xl font-bold text-black dark:text-amber-600 mb-4">Khách Hàng</h2>
                <table className="min-w-full divide-y divide-blue-300">
                    <thead className="bg-blue-300">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[150px] wrap-break-word">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[120px] wrap-break-wordword">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[100px] wrap-break-word">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-blue-300 divide-y divide-blue-300">
                        {renderUsers(khachHangUsers)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users