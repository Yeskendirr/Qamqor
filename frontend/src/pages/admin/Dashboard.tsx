import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { newsApi, projectsApi, contactApi, eventsApi } from '../../api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ news: 0, projects: 0, events: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      newsApi.getAllAdmin(),
      projectsApi.getAll(),
      eventsApi.getAll(),
      contactApi.getAll(),
    ]).then(([n, p, e, c]) => {
      setCounts({
        news: n.data.length,
        projects: p.data.length,
        events: e.data.length,
        unread: c.data.filter((m: { is_read: number }) => m.is_read === 0).length,
      });
    });
  }, []);

  const stats = [
    { label: 'Жаналыктар', value: counts.news, to: '/admin/news' },
    { label: 'Жобалар', value: counts.projects, to: '/admin/projects' },
    { label: 'Іс-шаралар', value: counts.events, to: '/admin/events' },
    { label: 'Оталмаган', value: counts.unread, to: '/admin/contacts' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>QamQor корынын жалпы аппараты</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.to} to={s.to} className="card p-5 hover:bg-gray-50 transition-colors">
            <div className="text-3xl font-bold" style={{ color: 'var(--color-green)' }}>{s.value}</div>
            <div className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="card p-6">
        <p className="text-sm font-medium mb-4">Жылдам косу</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['/admin/news', '+ Жаналык'],
            ['/admin/projects', '+ Жоба'],
            ['/admin/events', '+ Іс-шара'],
            ['/admin/gallery', '+ Сурет'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-center py-2.5 rounded-md border transition-colors hover:bg-gray-50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
