import React, { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Breadcrumbs from './Breadcrumbs';

const LINKS = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/news', label: 'Жаналыктар' },
  { to: '/admin/projects', label: 'Жобалар' },
  { to: '/admin/events', label: 'Іс-шаралар' },
  { to: '/admin/gallery', label: 'Галерея' },
  { to: '/admin/contacts', label: 'Хабарлар' },
  { to: '/admin/faq', label: 'FAQ' },
  { to: '/admin/about', label: 'Корт туралы' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-surface)' }}>
      <aside className="w-56 shrink-0 bg-white border-r flex flex-col" style={{ borderColor: 'var(--color-border)' }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Link to="/" className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'var(--color-green)' }}
            >
              Q
            </span>
            <span className="text-sm font-semibold">QamQor</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/admin'}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'font-medium text-green-800 bg-green-100'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs px-3 mb-1" style={{ color: 'var(--color-muted)' }}>{username}</p>
          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="w-full text-left px-3 py-2 text-sm rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Шыгу
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <Breadcrumbs />
          {children}
        </div>
      </div>
    </div>
  );
}
