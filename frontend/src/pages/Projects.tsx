import React, { useEffect, useState } from 'react';
import { projectsApi } from '../api';
import type { Project } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

type Filter = 'all' | 'active' | 'completed';

export default function Projects() {
  const [items, setItems] = useState<Project[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi.getAll().then((r) => { setItems(r.data); setLoading(false); });
  }, []);

  const visible = filter === 'all' ? items : items.filter((p) => p.status === filter);

  return (
    <>
      <PageHeader title="Жобалар" subtitle="Когамдык игілікке арналган бадарламалар" />
      <section className="section">
        <div className="container">
          <div className="flex gap-2 mb-8">
            {(['all', 'active', 'completed'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
                }`}
                style={filter === f ? { background: 'var(--color-green)' } : {}}
              >
                {f === 'all' ? 'Барлыгы' : f === 'active' ? 'Белсенді' : 'Аякталды'}
              </button>
            ))}
          </div>

          {loading ? <Spinner /> : visible.length === 0 ? (
            <p className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Жобалар жок</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map((p) => (
                <div key={p.id} className="card flex flex-col">
                  {p.image_url && (
                    <div className="h-44 overflow-hidden">
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={p.status === 'active' ? 'tag tag-green' : 'tag tag-gray'}>
                      {p.status === 'active' ? 'Белсенді' : 'Аякталды'}
                    </span>
                    {p.start_date && (
                      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        {new Date(p.start_date).getFullYear()}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold mb-2">{p.title}</h2>
                  <p className="text-sm leading-relaxed line-clamp-4 flex-1" style={{ color: 'var(--color-muted)' }}>
                    {p.description}
                  </p>
                  <div className="divider mt-5 pt-4">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-green)' }}>
                      {p.beneficiaries.toLocaleString()} адам
                    </span>
                    <span className="text-xs ml-1" style={{ color: 'var(--color-muted)' }}>камтылды</span>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
