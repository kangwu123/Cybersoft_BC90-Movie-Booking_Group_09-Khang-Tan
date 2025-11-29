import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Film, ArrowUp } from 'lucide-react'

const Footer = () => {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#0b0b0d] border-t border-red-800/60 pt-12 pb-8 mt-10">
      {/* Decorative faint icons */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-6 left-10 text-red-700/10"><Film size={56} /></div>
        <div className="absolute top-24 right-20 text-red-700/10"><Film size={42} /></div>
        <div className="absolute bottom-10 left-1/3 text-red-700/10"><Film size={48} /></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img className="w-36 h-16 object-cover hover:opacity-90 transition"
                src="/img/Logo.png"
                alt="CinemaProduction Logo" />
            </div>
            <p className="mt-4 text-sm text-zinc-300/80 leading-6 max-w-sm">
              Experience the dark side of cinema with the latest news, reviews, and exclusive content.
            </p>
            <div className="mt-5 flex items-center gap-3 text-zinc-300/90">
              <a className="p-2.5 rounded-full border border-zinc-700/60 hover:border-red-500 hover:bg-red-600/10 transition" href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a className="p-2.5 rounded-full border border-zinc-700/60 hover:border-red-500 hover:bg-red-600/10 transition" href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a className="p-2.5 rounded-full border border-zinc-700/60 hover:border-red-500 hover:bg-red-600/10 transition" href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a className="p-2.5 rounded-full border border-zinc-700/60 hover:border-red-500 hover:bg-red-600/10 transition" href="#" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-red-500">•</span> Explore</h4>
            <ul className="space-y-3 text-zinc-300/90">
              <li><Link to="/" className="hover:text-red-400 transition">Home</Link></li>
              <li><Link to="/movies" className="hover:text-red-400 transition">Movies</Link></li>
              <li><Link to="*" className="hover:text-red-400 transition">Cinemas</Link></li>
              <li><Link to="/buy-ticket" className="hover:text-red-400 transition">Buy Tickets</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition">Contact</Link></li>
              <li><Link to="/login" className="hover:text-red-400 transition">Login</Link></li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-red-500">•</span>More Info</h4>
            <ul className="space-y-3 text-zinc-300/90">
              <li><a href="#" className="hover:text-red-400 transition-colors duration-200 flex items-center gap-2">FAQ</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-200 flex items-center gap-2">About Us</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-200 flex items-center gap-2">Careers</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-200 flex items-center gap-2"> Help</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2"><span className="text-red-500">•</span> Contact Us</h4>
            <ul className="space-y-4 text-zinc-200/90">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-red-500/50 text-red-400"><Mail size={18} /></div>
                <span>khangvu250296@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-red-500/50 text-red-400"><Phone size={18} /></div>
                <span>+84 768957156</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg border border-red-500/50 text-red-400"><MapPin size={18} /></div>
                <span>HCMC, Vietnam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with center icon */}
        <div className="relative mt-10">
          <div className="h-px bg-red-800/50"></div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-4">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 bg-[#0b0b0d] flex items-center justify-center">
              <Film size={22} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="space-x-6">
            <Link to="#" className="hover:text-red-400">Privacy Policy</Link>
            <Link to="#" className="hover:text-red-400">Terms of Service</Link>
            <Link to="#" className="hover:text-red-400">Cookie Policy</Link>
          </div>
          <p className="text-zinc-500">© {new Date().getFullYear()} Cinema Production. All rights reserved.</p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <span className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-[0_10px_25px_rgba(248,69,101,0.45)] flex items-center justify-center">
          <ArrowUp size={22} />
        </span>
      </button>
    </footer>
  )
}

export default Footer