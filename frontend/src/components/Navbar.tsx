import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Басты бет' },
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
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
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
          {NAV.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
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
