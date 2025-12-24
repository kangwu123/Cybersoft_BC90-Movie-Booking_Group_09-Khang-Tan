import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./_components/Header";
import Switch from "./_components/Switch";
import AdminFooter from "./_components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AdminTemplate = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const adminUsername = localStorage.getItem('USER_ADMIN') ? JSON.parse(localStorage.getItem('USER_ADMIN')).taiKhoan : 'Admin';
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const breadcrumbMap = {
    'admin': 'Home',
    'movies': 'Movies',
    'users': 'Users',
    'settings': 'Settings'
  }

  const pathSegments = location.pathname.split('/').filter(Boolean)
  const crumbs = []
  // Always have Dashboard as root if route includes admin
  if (pathSegments.length === 0 || pathSegments[0] === 'admin') {
    crumbs.push('Dashboard / Home')
  }
  // For each segment after admin, add label
  for (let i = (pathSegments[0] === 'admin' ? 1 : 0); i < pathSegments.length; i++) {
    const seg = pathSegments[i]
    crumbs.push(breadcrumbMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1))
  }
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (location.state?.fromLogin) {
      toast.success('Login Successful');
    }
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    MySwal.fire({
      title: 'You are processing to logout this Page!',
      text: "Please confirm to proceed. Are you sure want to Logout?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('USER_ADMIN');
        navigate('/auth');
      }
    });
  };

  return (
    <div className="admin-layout">
      <AdminHeader theme={theme} />
      <div className={`flex-5 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <ToastContainer />
        {/* Header */}
        <header className={`p-4 flex justify-between items-center sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white shadow-md'}`}>
          {/* Search */}
          <div className="flex items-center gap-3">
            {/* Input with search icon */}
            <div className="relative w-64 md:w-80">
              <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 w-full border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>

            {/* Search Button */}
            <button className="px-5 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md">
              Search
            </button>
          </div>

          {/* User & Notifications */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Switch theme={theme} onToggle={toggleTheme} />
            {/* Bell */}
            <button className="relative p-2 cursor-pointer group">
              <i className={`fa-solid fa-bell text-lg animate-bell transition-colors duration-300 group-hover:text-red-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}></i>
              <span className={`absolute top-1 right-2 w-3 h-3 bg-red-500 rounded-full border-2 ${theme === 'dark' ? 'border-gray-900' : 'border-white'}`}></span>
            </button>

            {/* Message */}
            <button className="relative p-2 cursor-pointer group">
              <i className={`fi fi-sr-comment-alt-dots text-lg animate-breath transition-colors duration-300 group-hover:text-cyan-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}></i>
              <span className={`absolute top-1 right-0 w-3 h-3 bg-red-500 rounded-full border-2 ${theme === 'dark' ? 'border-gray-900' : 'border-white'}`}></span>
            </button>

            <div className="relative">
              <button onClick={() => setDropdownOpen(!isDropdownOpen)} className={`flex items-center gap-2 text-gray-700 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>Hi,
                  <strong className={theme === 'dark' ? 'text-amber-500 font-semibold' : 'text-red-600 font-semibold'}>{adminUsername || ''}</strong></span>
                <div className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <img
                    src="/img/avatarLogo.jpg"
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://picsum.photos/200/300';
                    }}
                  />
                </div>
                <i className={`fa-solid fa-chevron-down transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}></i>
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-xl border ring-1 z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 ring-gray-700' : 'bg-white border-gray-100 ring-gray-200'}`}>
                  <ul className={`py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <li>
                      <button
                        onClick={() => navigate('/')}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-blue-50 hover:text-blue-600'}`}
                      >
                        Go to Home Page
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-blue-50 hover:text-blue-600'}`}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
      </header>

        {/* Main Content */}
        <main className="p-6 content-container">
          <div className="breadcrumb">
            {crumbs.length > 0 ? (
              crumbs.map((c, i) => (
                <span key={i}>
                  {i > 0 && <>  /  </>}
                  <span className="crumb">{c}</span>
                </span>
              ))
            ) : (
              <span className="crumb">Home</span>
            )}
          </div>
          <div className="p-4 content-wrapper flex-1 sm:p-6 md:p-6 lg:p-8 xl:p-12">
            <Outlet />
          </div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};
export default AdminTemplate;
