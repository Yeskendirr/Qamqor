import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsApi } from '../api';
import type { NewsItem } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsApi.getAll().then((r) => { setItems(r.data); setLoading(false); });
  }, []);

  return (
    <>
      <PageHeader title="Жаналыктар" subtitle="Кордын омірінде со акигалар мен натижелер" />
      <section className="section">
        <div className="container">
          {loading ? <Spinner /> : items.length === 0 ? (
            <p className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Жаналыктар жок</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((n) => (
                <Link to={`/news/${n.id}`} key={n.id} className="card group">
                  <div className="h-44 overflow-hidden" style={{ background: 'var(--color-green-light)' }}>
                    {n.image_url && <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  </div>
                  <div className="p-5">
                    <time className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {new Date(n.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <h2 className="font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-green-800 transition-colors">{n.title}</h2>
                    <p className="text-sm line-clamp-3" style={{ color: 'var(--color-muted)' }}>
                      {n.excerpt || n.content.slice(0, 150)}
                    </p>
                    <span className="inline-block mt-3 text-sm font-medium" style={{ color: 'var(--color-green)' }}>
                      Толыгырак &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
