import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData, deleteUser } from './slice'
import User from './user'
import UserForm from './UserForm'
import { Pagination, Checkbox, TextField, InputAdornment, IconButton, Menu, MenuItem } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { Search, FilterList } from '@mui/icons-material';

const Users = () => {
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [page, setPage] = useState(1);
    const [khachHangPage, setKhachHangPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [quanTriSelected, setQuanTriSelected] = useState([]);
    const [khachHangSelected, setKhachHangSelected] = useState([]);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [filterColumns, setFilterColumns] = useState(['taiKhoan']);

    const dispatch = useDispatch()

    const stateUser = useSelector((state) => state.userManageReducer)

    const { dataUsers, loading } = stateUser

    const handleFilterOpen = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };

    const handleFilterColumnToggle = (column) => {
        setFilterColumns(prev =>
            prev.includes(column)
                ? prev.filter(c => c !== column)
                : [...prev, column]
        );
    };

    const filteredData = dataUsers?.filter(user => {
        if (!debouncedSearchTerm) return true;
        return filterColumns.some(column =>
            user[column]?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    });

    const quanTriUsers = filteredData?.filter(user => user.maLoaiNguoiDung === 'QuanTri');
    const khachHangUsers = filteredData?.filter(user => user.maLoaiNguoiDung === 'KhachHang');

    const itemsPerPage = 5;
    const quanTriCount = Math.ceil(quanTriUsers?.length / itemsPerPage);
    const khachHangCount = Math.ceil(khachHangUsers?.length / itemsPerPage);

    const paginatedQuanTriData = quanTriUsers?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const paginatedKhachHangData = khachHangUsers?.slice((khachHangPage - 1) * itemsPerPage, khachHangPage * itemsPerPage);

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    const handleQuanTriSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = paginatedQuanTriData.map((n) => n.taiKhoan);
            setQuanTriSelected(newSelecteds);
            return;
        }
        setQuanTriSelected([]);
    };

    const handleKhachHangSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = paginatedKhachHangData.map((n) => n.taiKhoan);
            setKhachHangSelected(newSelecteds);
            return;
        }
        setKhachHangSelected([]);
    };

    const handleQuanTriClick = (event, name) => {
        const selectedIndex = quanTriSelected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(quanTriSelected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(quanTriSelected.slice(1));
        } else if (selectedIndex === quanTriSelected.length - 1) {
            newSelected = newSelected.concat(quanTriSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                quanTriSelected.slice(0, selectedIndex),
                quanTriSelected.slice(selectedIndex + 1),
            );
        }
        setQuanTriSelected(newSelected);
    };

    const handleKhachHangClick = (event, name) => {
        const selectedIndex = khachHangSelected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(khachHangSelected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(khachHangSelected.slice(1));
        } else if (selectedIndex === khachHangSelected.length - 1) {
            newSelected = newSelected.concat(khachHangSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                khachHangSelected.slice(0, selectedIndex),
                khachHangSelected.slice(selectedIndex + 1),
            );
        }
        setKhachHangSelected(newSelected);
    };

    const isQuanTriSelected = (name) => quanTriSelected.indexOf(name) !== -1;
    const isKhachHangSelected = (name) => khachHangSelected.indexOf(name) !== -1;

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

    const renderUsers = (users, isQuanTri) => {
        return users?.map((user) => {
            const isItemSelected = isQuanTri ? isQuanTriSelected(user.taiKhoan) : isKhachHangSelected(user.taiKhoan);
            const handleClick = isQuanTri ? handleQuanTriClick : handleKhachHangClick;
            return <User key={user.taiKhoan} propUser={user} onEdit={(u) => { setEditingUser(u); setShowUserModal(true) }} onDelete={async (taiKhoan) => { if (confirm('Delete user?')) { await dispatch(deleteUser(taiKhoan)).unwrap(); dispatch(fetchUserData()) } }} isSelected={isItemSelected} onCheckboxClick={(event) => handleClick(event, user.taiKhoan)} />
        })
    }

    return (
        <div className="pt-0.5">
            {/* Title */}
            <h1 className="text-3xl font-bold text-black dark:text-amber-600 mb-6">User Management</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex w-full md:w-1/2 gap-2">
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search User..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={handleFilterOpen}>
                        <FilterList />
                    </IconButton>
                    <Menu
                        anchorEl={filterAnchorEl}
                        open={Boolean(filterAnchorEl)}
                        onClose={handleFilterClose}
                    >
                        <MenuItem onClick={() => handleFilterColumnToggle('taiKhoan')}>
                            <Checkbox checked={filterColumns.includes('taiKhoan')} />
                            Account
                        </MenuItem>
                        <MenuItem onClick={() => handleFilterColumnToggle('hoTen')}>
                            <Checkbox checked={filterColumns.includes('hoTen')} />
                            Full Name
                        </MenuItem>
                        <MenuItem onClick={() => handleFilterColumnToggle('email')}>
                            <Checkbox checked={filterColumns.includes('email')} />
                            Email
                        </MenuItem>
                        <MenuItem onClick={() => handleFilterColumnToggle('soDT')}>
                            <Checkbox checked={filterColumns.includes('soDT')} />
                            Phone Number
                        </MenuItem>
                    </Menu>
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
                            <th padding="checkbox">
                                <Checkbox
                                    indeterminate={
                                        paginatedQuanTriData && quanTriSelected.length > 0 && quanTriSelected.length < paginatedQuanTriData.length
                                    }
                                    checked={paginatedQuanTriData && paginatedQuanTriData.length > 0 && quanTriSelected.length === paginatedQuanTriData.length}
                                    onChange={handleQuanTriSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[150px] wrap-break-word">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[120px] wrap-break-wordword">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[100px] wrap-break-word">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-blue-300 divide-y divide-blue-300">
                        {renderUsers(paginatedQuanTriData, true)}
                    </tbody>
                </table>
                <Pagination
                    count={quanTriCount}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary"
                    className="mt-4 flex justify-center"
                />
            </div>

            <div className="bg-blue-300 p-6 rounded-lg shadow-lg overflow-x-auto">
                <h2 className="text-2xl font-bold text-black dark:text-amber-600 mb-4">Khách Hàng</h2>
                <table className="min-w-full divide-y divide-blue-300">
                    <thead className="bg-blue-300">
                        <tr>
                            <th padding="checkbox">
                                <Checkbox
                                    indeterminate={
                                        paginatedKhachHangData && khachHangSelected.length > 0 && khachHangSelected.length < paginatedKhachHangData.length
                                    }
                                    checked={paginatedKhachHangData && paginatedKhachHangData.length > 0 && khachHangSelected.length === paginatedKhachHangData.length}
                                    onChange={handleKhachHangSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                />
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[150px] wrap-break-word">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[200px] wrap-break-word">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[120px] wrap-break-wordword">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider max-w-[100px] wrap-break-word">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-blue-300 divide-y divide-blue-300">
                        {renderUsers(paginatedKhachHangData, false)}
                    </tbody>
                </table>
                <Pagination
                    count={khachHangCount}
                    page={khachHangPage}
                    onChange={(event, value) => setKhachHangPage(value)}
                    color="primary"
                    className="mt-4 flex justify-center"
                />
            </div>
        </div>
    )
}

export default Users