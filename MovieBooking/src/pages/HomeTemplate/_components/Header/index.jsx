import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto focus the input when opening search
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="top-0 left-0 z-40 w-full flex items-center justify-between px-4 md:px-6 lg:px-8 py-3">
      <div className="container mx-auto flex justify-between items-center ">
        <NavLink to="/" className="max-md:flex-1">
          <img className="w-36 h-16 object-cover hover:opacity-90 transition"
            src="/img/Logo.png"
            alt="CinemaProduction Logo" />
        </NavLink>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-8 md:px-8 py-3 md:rounded-full backdrop-blur-md md:bg-white/10 md:border border-gray-300/20">
          <ul className="flex items-center gap-10">
            {/* HOME */}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="/"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fa-solid fa-house text-2xl group-hover:text-red-400"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Home</span>
                <span className={({ isActive }) =>
                  `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`
                }
                ></span>
              </NavLink>
            </li>

            {/* MOVIES */}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="/movie-list"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fa-solid fa-film text-2xl group-hover:text-red-400"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Movies</span>
                <span
                  className={({ isActive }) =>
                    `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                ></span>
              </NavLink>
            </li>

            {/* CINEMAS */}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="/cinemas"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fi fi-sr-land-layer-location text-2xl group-hover:text-red-400"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Cinemas</span>
                <span
                  className={({ isActive }) =>
                    `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                ></span>
              </NavLink>
            </li>

            {/* BUY TICKETS */}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="/buy-ticket"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fi fi-rs-ticket text-2xl text-transparent bg-clip-text bg-linear-to-r from-red-500 via-yellow-500 to-green-700"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Buy Tickets</span>
                <span
                  className={({ isActive }) =>
                    `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                ></span>
              </NavLink>
            </li>

            {/* PROMOTIONS */}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="*"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fi fi-rs-gift-box-benefits text-2xl group-hover:text-red-400"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Promotions</span>
                <span
                  className={({ isActive }) =>
                    `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                ></span>
              </NavLink>
            </li>

            {/* Contact*/}
            <li>
              <NavLink
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                to="*"
                className={({ isActive }) =>
                  `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                  }`
                }
              >
                <div>
                  <i className="fi fi-ss-phone-call text-2xl group-hover:text-red-400"></i>
                </div>
                <span className="text-sm mt-1 group-hover:text-red-400">Contact</span>
                <span
                  className={({ isActive }) =>
                    `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`
                  }
                ></span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* SEARCH (Desktop) */}
        <div className="flex items-center gap-8">
          <div className="relative max-md:hidden">
            <AnimatePresence initial={false}>
              {!searchOpen ? (
                <motion.button
                  key="search-button"
                  aria-label="Open Search"
                  onClick={() => setSearchOpen(true)}
                  className="p-1"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <SearchIcon className="w-6 h-6 cursor-pointer" />
                </motion.button>
              ) : (
                <motion.div
                  key="search-input"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-center overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1"
                >
                  <SearchIcon className="w-6 h-6 mr-2 text-gray-300" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search movies..."
                    className="w-full bg-transparent outline-none placeholder:text-gray-400 text-gray-100"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchOpen(false);
                        setQuery('');
                      }
                    }}
                  />
                  <button
                    aria-label="Close Search"
                    onClick={() => {
                      setSearchOpen(false);
                      setQuery('');
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-white/10"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
            Login
          </button>
        </div>

        {/* Menu Icon for Responsive Mode */}
        <button aria-label="Open Menu" className="max-md:ml-4 md:hidden" onClick={() => setIsOpen(true)}>
          <MenuIcon className="w-8 h-8 cursor-pointer" />
        </button>
      </div>

      {/* Mobile Navbar (animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col md:hidden items-center bg-black/80 backdrop-blur-md"
          >
            <button
              aria-label="Close Menu"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="w-6 h-6" />
            </button>

            <ul className="mt-16 flex flex-col items-center gap-8 px-6">
              {/* HOME */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="/"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fa-solid fa-house text-2xl group-hover:text-red-400"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Home</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

              {/* MOVIES */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="/movie-list"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fa-solid fa-film text-2xl group-hover:text-red-400"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Movies</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

              {/* CINEMAS */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="/cinemas"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fi fi-sr-land-layer-location text-2xl group-hover:text-red-400"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Cinemas</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

              {/* BUY TICKETS */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="/buy-ticket"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fi fi-rs-ticket text-2xl text-transparent bg-clip-text bg-linear-to-r from-red-500 via-yellow-500 to-green-700"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Buy Tickets</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

              {/* PROMOTIONS */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="*"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fi fi-rs-gift-box-benefits text-2xl group-hover:text-red-400"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Promotions</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

              {/* CONTACT  */}
              <li>
                <NavLink
                  onClick={() => {
                    scrollTo(0, 0);
                    setIsOpen(false);
                  }}
                  to="*"
                  className={({ isActive }) =>
                    `group flex flex-col items-center transition-all duration-300 ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-400'
                    }`
                  }
                >
                  <div>
                    <i className="fi fi-ss-phone-call text-2xl group-hover:text-red-400"></i>
                  </div>
                  <span className="text-sm mt-1 group-hover:text-red-400">Contact</span>
                  <span
                    className={({ isActive }) =>
                      `mt-1 h-0.5 bg-red-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`
                    }
                  ></span>
                </NavLink>
              </li>

            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
