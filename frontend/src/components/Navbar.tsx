import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const DROPDOWN = [
  { to: '/news', label: 'Жаналыктар' },
  { to: '/projects', label: 'Жобалар' },
  { to: '/events', label: 'Іс-шаралар' },
  { to: '/gallery', label: 'Галерея' },
];

const NAV = [
  { to: '/about', label: 'Қор туралы' },
  { to: '/contact', label: 'Байланыс' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="font-semibold text-sm tracking-tight">
          QamQor
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Басты бет с дропдауном */}
          <div className="relative group">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Басты бет
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>

            <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-10">
              <div
                className="rounded-lg shadow-md py-1 min-w-[160px] border bg-white"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {DROPDOWN.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? 'text-green-800 font-medium bg-green-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t px-6 py-3 space-y-0.5" style={{ borderColor: 'var(--color-border)' }}>
          <NavLink
            to="/"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm ${
                isActive ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500 hover:bg-gray-50'
              }`
            }
          >
            Басты бет
          </NavLink>
          <p className="px-3 pt-1 pb-0.5 text-xs font-medium text-gray-400">Бөлімдер</p>
          {DROPDOWN.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
