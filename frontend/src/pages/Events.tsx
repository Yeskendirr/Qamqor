import React, { useEffect, useState } from 'react';
import { eventsApi } from '../api';
import type { Event } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

type Filter = 'all' | 'upcoming' | 'past';

export default function Events() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const now = new Date();

  useEffect(() => {
    eventsApi.getAll().then((r) => { setItems(r.data); setLoading(false); });
  }, []);

  const filtered = items.filter((e) => {
    const past = new Date(e.event_date) < now;
    if (filter === 'upcoming' && past) return false;
    if (filter === 'past' && !past) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
    }
    return true;
  });

  const FILTERS: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Барлығы' },
    { value: 'upcoming', label: 'Алдағы' },
    { value: 'past', label: 'Өткен' },
  ];

  return (
    <>
      <PageHeader title="Іс-шаралар" subtitle="Бізбен бірге болыңыз" />
      <section className="section">
        <div className="container max-w-3xl">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="text"
              className="field flex-1"
              placeholder="Атауы немесе сипаттамасы бойынша іздеу..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-1 shrink-0">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    filter === f.value
                      ? 'text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                  style={filter === f.value
                    ? { background: 'var(--color-green)', borderColor: 'var(--color-green)' }
                    : { borderColor: 'var(--color-border)', color: 'var(--color-muted)' }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? <Spinner /> : filtered.length === 0 ? (
            <p className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Іс-шаралар табылмады</p>
          ) : (
            <div className="space-y-4">
              {filtered.map((e) => {
                const d = new Date(e.event_date);
                const past = d < now;
                return (
                  <div key={e.id} className="card p-6 flex gap-6">
                    <div
                      className="shrink-0 w-16 text-center rounded-lg py-3"
                      style={{
                        background: past ? '#f3f4f6' : 'var(--color-green-light)',
                        color: past ? '#9ca3af' : 'var(--color-green)',
                      }}
                    >
                      <div className="text-xs font-semibold uppercase">
                        {d.toLocaleDateString('ru-RU', { month: 'short' })}
                      </div>
                      <div className="text-2xl font-bold leading-tight">{d.getDate()}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-semibold">{e.title}</h2>
                        <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${past ? 'bg-gray-100 text-gray-400' : 'tag tag-green'}`}>
                          {past ? 'Өткен' : 'Алдағы'}
                        </span>
                      </div>
                      {e.location && (
                        <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{e.location}</p>
                      )}
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{e.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
