import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const AdminHeader = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSettingsOpen, setSettingsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkResize = () => setIsMobile(window.innerWidth <= 768)
        checkResize()
        window.addEventListener('resize', checkResize)
        return () => window.removeEventListener('resize', checkResize)
    }, [])

    useEffect(() => {
        // On small screens start collapsed (closed) but allow toggle to open
        if (isMobile) setCollapsed(true)
    }, [isMobile])

    useEffect(() => {
        if (!location.pathname.startsWith('/admin/settings')) {
            setSettingsOpen(false);
        }
    }, [location.pathname]);

    return (
        <aside className={`admin-aside ${collapsed ? 'collapsed' : ''} ${isMobile && !collapsed ? 'open-mobile' : ''}`}>
            <div className="header-top flex items-center justify-between px-4 py-3">
                <div className="w-auto text-2xl font-extrabold text-blue-400 flex items-center justify-center logo">
                    <img src="/img/Logo.png" alt="Logo" />
                </div>

                <button
                    className={`toggle-btn ${(!collapsed && isMobile) ? 'rotated' : ''}`}
                    aria-label="Toggle sidebar"
                    aria-expanded={!collapsed}
                    onClick={() => setCollapsed((c) => !c)}
                >
                    <i className="fa-solid fa-bars bar-icon"></i>
                </button>
            </div>

            <nav className="flex flex-col py-8 gap-5" role="navigation">
                <NavLink
                    to="/admin"
                    title="Dashboard"
                    end
                    className={({ isActive }) =>
                        `nav-item flex items-center p-4 transition duration-150 ${isActive ? "bg-white text-black"
                            : "hover:bg-gray-300 hover:text-black text-white"
                        }`
                    }
                >
                    <span className="mr-3"><i className="fi fi-br-stats"></i></span>
                    <span className="nav-label" aria-hidden={collapsed}>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/movies"
                    title="Movies"
                    className={({ isActive }) =>
                        `nav-item flex items-center p-4 transition duration-150 ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-300 hover:text-black text-white"
                        }`
                    }
                >
                    <span className="mr-3"><i className="fi fi-ss-clapper-open"></i></span>
                    <span className="nav-label" aria-hidden={collapsed}>Movies</span>
                </NavLink>

                <NavLink
                    to="/admin/users"
                    title="Users"
                    className={({ isActive }) =>
                        `nav-item flex items-center p-4 transition duration-150 ${isActive
                            ? "bg-white text-black"
                            : "hover:bg-gray-300 hover:text-black text-white"
                        }`
                    }
                >
                    <span className="mr-3"><i className="fi fi-sr-user"></i></span>
                    <span className="nav-label" aria-hidden={collapsed}>Users</span>
                </NavLink>

                <div>
                    <button
                        onClick={() => setSettingsOpen(!isSettingsOpen)}
                        className={`nav-item flex items-center p-4 transition duration-150 w-full ${location.pathname.startsWith('/admin/settings')
                            ? "bg-white text-black"
                            : "hover:bg-gray-300 hover:text-black text-white"
                            }`}>
                        <span className="mr-3"><i className="fi fi-rr-settings"></i></span>
                        <span className="nav-label" aria-hidden={collapsed}>Settings</span>
                        <span className={`transition-transform duration-300 ${isSettingsOpen ? 'rotate-180' : ''} ${!collapsed ? 'ml-auto' : ''}`}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </span>
                    </button>
                    {isSettingsOpen && (
                        <ul className="pl-2">
                            <li>
                                <NavLink to="/admin/settings/system" title="System Settings" className={({ isActive }) => `flex items-center p-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                    <span className="mr-3"><i className="fi fi-rr-screwdriver"></i></span>
                                    <span className="nav-label" aria-hidden={collapsed}>System Settings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/settings/notifications" title="Notifications Settings" className={({ isActive }) => `flex items-center p-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                    <span className="mr-3"><i className="fi fi-rr-bell"></i></span>
                                    <span className="nav-label" aria-hidden={collapsed}>Notification Settings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/settings/logo" title="Logo Settings" className={({ isActive }) => `flex items-center p-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                    <span className="mr-3"><i className="fi fi-rr-films"></i></span>
                                    <span className="nav-label" aria-hidden={collapsed}>Logo Cinema Settings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/settings/location" title="Location Settings" className={({ isActive }) => `flex items-center p-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                                    <span className="mr-3"><i className="fi fi-ss-marker"></i></span>
                                    <span className="nav-label" aria-hidden={collapsed}>Location Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </aside>
    )
}

export default AdminHeader