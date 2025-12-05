import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AdminHeader from "./_components/Header";
import Switch from "./_components/Switch";
import AdminFooter from "./_components/Footer";

const AdminTemplate = () => {
  const location = useLocation()

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

  return (
    <div className="admin-layout">
      <AdminHeader theme={theme} />
      <div className={`flex-5 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
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

            {/* Greeting */}
            <span className={`text-gray-700 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Hi, <strong className={theme === 'dark' ? 'text-white font-semibold' : 'text-gray-900 font-semibold'}>Admin</strong>
            </span>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
              <img
                src="/img/avatarLogo.jpg"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown Logout */}
            <div className="relative inline-block text-left">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className={`flex items-center justify-center p-2 rounded-full transition duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white hover:bg-gray-100'}`}
              >
              <i className={`fa-solid fa-chevron-down ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}></i>
              </button>

              {/* Dropdown Menu */}
              <div
                id="dropdown"
                className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-xl border ring-1 hidden z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 ring-gray-700' : 'bg-white border-gray-100 ring-gray-200'}`}
              >
                <ul className={`py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>
                    <a
                      href="#"
                      className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-gray-700 hover:text-white' : 'hover:bg-blue-50 hover:text-blue-600'}`}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
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
