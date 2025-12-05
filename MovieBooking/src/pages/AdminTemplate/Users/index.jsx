import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './slice'
import User from './user'

const Users = () => {
    const [showUserModal, setShowUserModal] = useState(false);

    const dispatch = useDispatch()

    const stateUser = useSelector((state) => state.userManageReducer)

    const { dataUsers, loading } = stateUser

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

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

    const renderUsers = () => {
        return dataUsers?.map((user) => {
            return <User key={user.taiKhoan} propUser={user} />
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
                    onClick={() => setShowUserModal(true)}
                >
                    Add User
                </button>
            </div>

            {showUserModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-indigo-400 rounded-2xl shadow-xl w-full max-w-3xl relative">

                        {/* HEADER */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-wide">
                                Add New User
                            </h3>
                            <button
                                className="text-gray-500 hover:text-red-500 transition-colors duration-300 cursor-pointer"
                                type="button"
                                onClick={() => setShowUserModal(false)}
                            >
                                <i className="fa-solid fa-x text-lg" />
                            </button>
                        </div>

                       {/* BODY */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Enter username"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="fullName">Full Name</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="Enter full name"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="phone">Phone</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-200 mb-2" htmlFor="role">Role</label>
                                    <select
                                        id="role"
                                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="customer">Customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                className="px-5 py-2 rounded-lg bg-[#C6C6C6] hover:bg-[#AAAAAA] transition cursor-pointer"
                                onClick={() => setShowUserModal(false)}
                            >
                                Close
                            </button>
                            <button className="px-5 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition cursor-pointer">
                                Add User
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[150px] wrap-break-word">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[120px] wrap-break-wordword">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[100px] wrap-break-word">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {renderUsers()}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Users
