import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsApi } from '../api';
import type { NewsItem } from '../types';
import Spinner from '../components/Spinner';
import Breadcrumbs from '../components/Breadcrumbs';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    newsApi.getById(Number(id))
      .then((r) => setItem(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  if (notFound || !item) {
    return (
      <div className="container section text-center">
        <p style={{ color: 'var(--color-muted)' }}>Жаналык табылмады</p>
        <Link to="/news" className="btn-primary mt-4 inline-flex">Кайту</Link>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[
          { label: 'Басты бет', to: '/' },
          { label: 'Жаналыктар', to: '/news' },
          { label: item.title },
        ]} />
        <time className="block text-sm mb-3" style={{ color: 'var(--color-muted)' }}>
          {new Date(item.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h1 className="text-4xl font-bold mb-8">{item.title}</h1>
        {item.image_url && (
          <div className="h-64 rounded-xl mb-8 overflow-hidden">
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="space-y-4">
          {item.content.split('\n').filter(Boolean).map((p, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: '#333' }}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
