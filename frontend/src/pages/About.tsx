import React, { useEffect, useState } from 'react';
import { aboutApi } from '../api';
import type { AboutInfo } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

export default function About() {
  const [data, setData] = useState<AboutInfo | null>(null);

  useEffect(() => { aboutApi.get().then((r) => setData(r.data)); }, []);

  if (!data) return <Spinner />;

  return (
    <>
      <PageHeader title={data.title} subtitle={data.description} />

      <section className="section border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {data.founded_year && (
              <div>
                <div className="text-4xl font-bold" style={{ color: 'var(--color-green)' }}>{data.founded_year}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Куры жылы</div>
              </div>
            )}
            {data.team_count && (
              <div>
                <div className="text-4xl font-bold" style={{ color: 'var(--color-green)' }}>{data.team_count}+</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Волонтерлер</div>
              </div>
            )}
            <div>
              <div className="text-4xl font-bold" style={{ color: 'var(--color-green)' }}>5 000+</div>
              <div className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>Комектескен адамдар</div>
            </div>
          </div>
        </div>
      </section>

      {(data.mission || data.vision) && (
        <section className="section border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.mission && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>Миссия</p>
                  <p className="text-base leading-relaxed">{data.mission}</p>
                </div>
              )}
              {data.vision && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>Максат</p>
                  <p className="text-base leading-relaxed">{data.vision}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Кундылыктарымыз</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              ['Мейірімділік', 'Барлык адамга деген шынайы камкорлык'],
              ['Ашыктык', 'Каражаттын молдір пайдаланылуы'],
              ['Тиімділік', 'Натижеге багытталган іс-арекет'],
              ['Турактылык', 'Узак мерзімді он озгеріс'],
            ].map(([title, desc]) => (
              <div key={title} className="card p-6">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
