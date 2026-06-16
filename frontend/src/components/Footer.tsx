import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t mt-auto bg-green-700" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-3">
              <span className="font-semibold text-sm text-white">QamQor</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-white">
              Казахстандагы балалар мен отбасыларга білім, денсаулык жане алеуметтік колдау аркылы комек береміз.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">
              Навигация
            </p>
            <ul className="space-y-2">
              {[
                ['/about', 'Корт туралы'],
                ['/news', 'Жаналыктар'],
                ['/projects', 'Жобалар'],
                ['/events', 'Іс-шаралар'],
                ['/gallery', 'Галерея'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white hover:text-green-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">
              Байланыс
            </p>
            <ul className="space-y-2 text-sm text-white">
              <li>Семей, Казакстан</li>
              <li>+7 708 319 2678</li>
              <li>info@qamqor.kz</li>
            </ul>
          </div>
        </div>

        <div className="divider mt-10 pt-6 flex items-center justify-between">
          <p className="text-xs text-white">
            &copy; {new Date().getFullYear()} QamQor
          </p>
          <Link to="/admin/login" className="text-xs text-white transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
