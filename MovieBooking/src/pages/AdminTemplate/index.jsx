import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AdminHeader from "./_components/Header";

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
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    if (saved === 'light') document.body.classList.add('theme-light')
    else document.body.classList.remove('theme-light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'light') document.body.classList.add('theme-light')
    else document.body.classList.remove('theme-light')
  }

  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="flex-5 overflow-y-auto bg-gray-200">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
          {/* Search */}
          <div className="flex items-center gap-3">
            {/* Input with search icon */}
            <div className="relative w-64 md:w-80">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-300"
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
            <button
              className="theme-toggle relative p-2 cursor-pointer group"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'light'}
            >
              {theme === 'dark' ? (
                <i className="fa-solid fa-sun text-yellow-400 text-lg"></i>
              ) : (
                <i className="fa-solid fa-moon text-gray-800 text-lg"></i>
              )}
            </button>
            {/* Bell */}
            <button className="relative p-2 cursor-pointer group">
              <i className="fa-solid fa-bell text-gray-600 text-lg animate-bell transition-colors duration-300 group-hover:text-red-500"></i>
              <span className="absolute top-1 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Message */}
            <button className="relative p-2 cursor-pointer group">
              <i className="fi fi-sr-comment-alt-dots text-gray-600 text-lg animate-breath transition-colors duration-300 group-hover:text-cyan-500"></i>
              <span className="absolute top-1 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Greeting */}
            <span className="text-gray-700">
              Hi, <strong className="text-gray-900 font-semibold">Admin</strong>
            </span>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer">
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
                className="flex items-center justify-center p-2 bg-white rounded-full hover:bg-gray-100 transition duration-300 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-down text-gray-600"></i>
              </button>

              {/* Dropdown Menu */}
              <div
                id="dropdown"
                className="absolute right-0 mt-3! w-48 bg-white rounded-2xl shadow-xl border border-gray-100 ring-1 ring-gray-200 hidden z-50"
              >
                <ul className="py-2 text-sm text-gray-700 font-medium">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full px-4 py-2 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100
                          hover:text-blue-600 rounded-lg transition-all duration-200"
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
          <div className="p-6 content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminTemplate;
