import React from 'react'

const User = ({ propUser }) => {
    return (
        <tr
            key={propUser.taiKhoan}
            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
            <td className="px-6 py-4 text-sm text-black text-center">{propUser.taiKhoan}</td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-[150px] wrap-break-word whitespace-normal">{propUser.hoTen}</td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-[200px] wrap-break-words whitespace-normal">{propUser.email}</td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-[120px] wrap-break-words whitespace-normal">{propUser.soDT}</td>
            <td className="px-6 py-4 text-sm text-gray-700 max-w-[100px] wrap-break-words whitespace-normal">{propUser.maLoaiNguoiDung}</td>
            <td className="px-6 py-4 text-center flex justify-center items-center gap-2">
                <button className="text-indigo-600 hover:text-indigo-900 px-3 py-1 rounded-md bg-gray-100 hover:bg-indigo-50 transition font-medium">
                    <i className="fi fi-rr-edit"></i>
                </button>
                <button className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md bg-gray-100 hover:bg-red-50 transition font-medium">
                    <i className="fi fi-rr-trash"></i>
                </button>
            </td>
        </tr>
    )
}

export default User
