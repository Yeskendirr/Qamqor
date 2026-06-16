import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsApi, projectsApi, eventsApi, galleryApi } from '../api';
import type { NewsItem, Project, Event, GalleryItem } from '../types';
import FaqSection from '../components/FaqSection';

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    newsApi.getAll().then((r) => setNews(r.data.slice(0, 3)));
    projectsApi.getAll().then((r) => setProjects(r.data.slice(0, 3)));
    eventsApi.getAll().then((r) => setEvents(r.data.slice(0, 2)));
    galleryApi.getAll().then((r) => setGallery(r.data.slice(0, 6)));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="section border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="max-w-2xl">
            <span className="tag tag-green text-xs mb-5 inline-block">Казахстандагы кайырымдылык</span>
            <h1 className="text-5xl font-bold mb-6">
              QamQor<br />Кайырымдылык Коры
            </h1>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Білім, денсаулык жане алеуметтік колдау аркылы мукта балалар мен отбасыларга уміт сыйлаймыз.
            </p>
            <div className="flex gap-3">
              <Link to="/projects" className="btn-primary">Жобалар</Link>
              <Link to="/contact" className="btn-ghost">Байланыс</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['5 000+', 'Комек алган адамдар'],
              ['6', 'Жыл жумыс тажірибесі'],
              ['47', 'Волонтерлер'],
              ['12', 'Аяктал жобалар'],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-green)' }}>{val}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="section border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Жобалар</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>Когамга пайда тигізетін бадарламалар</p>
              </div>
              <Link to="/projects" className="text-sm font-medium" style={{ color: 'var(--color-green)' }}>Барлыгы &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {projects.map((p) => (
                <div key={p.id} className="card p-6">
                  <span className={p.status === 'active' ? 'tag tag-green' : 'tag tag-gray'}>
                    {p.status === 'active' ? 'Журіп жатыр' : 'Аякталды'}
                  </span>
                  <h3 className="font-semibold mt-4 mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--color-muted)' }}>{p.description}</p>
                  <p className="text-sm font-medium mt-4" style={{ color: 'var(--color-green)' }}>
                    {p.beneficiaries.toLocaleString()} адам
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News */}
      {news.length > 0 && (
        <section className="section border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Жаналыктар</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>Кордын омірінде маңызды окигалар</p>
              </div>
              <Link to="/news" className="text-sm font-medium" style={{ color: 'var(--color-green)' }}>Барлыгы &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {news.map((n) => (
                <Link to={`/news/${n.id}`} key={n.id} className="card group">
                  <div className="h-48 overflow-hidden" style={{ background: 'var(--color-green-light)' }}>
                    {n.image_url
                      ? <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full" style={{ background: 'var(--color-green-light)' }} />
                    }
                  </div>
                  <div className="p-5">
                    <time className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {new Date(n.published_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <h3 className="font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-green-800 transition-colors">{n.title}</h3>
                    <p className="text-sm line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                      {n.excerpt || n.content.slice(0, 100)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {events.length > 0 && (
        <section className="section border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Алдагы іс-шаралар</h2>
              </div>
              <Link to="/events" className="text-sm font-medium" style={{ color: 'var(--color-green)' }}>Барлыгы &rarr;</Link>
            </div>
            <div className="space-y-3">
              {events.map((e) => {
                const d = new Date(e.event_date);
                return (
                  <div key={e.id} className="card p-5 flex gap-5 items-start">
                    <div
                      className="shrink-0 w-14 text-center rounded-lg py-2"
                      style={{ background: 'var(--color-green-light)', color: 'var(--color-green)' }}
                    >
                      <div className="text-xs font-medium">{d.toLocaleDateString('ru-RU', { month: 'short' }).toUpperCase()}</div>
                      <div className="text-xl font-bold leading-none">{d.getDate()}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{e.title}</h3>
                      {e.location && <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{e.location}</p>}
                      <p className="text-sm mt-1 line-clamp-1" style={{ color: 'var(--color-muted)' }}>{e.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery bento */}
      {gallery.length > 0 && (
        <section className="section border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold">Галерея</h2>
                <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>Іс-шаралар мен жобалардың суреттері</p>
              </div>
              <Link to="/gallery" className="text-sm font-medium" style={{ color: 'var(--color-green)' }}>Барлығы &rarr;</Link>
            </div>
            <div className="grid grid-cols-4 grid-rows-2 gap-3" style={{ height: 420 }}>
              {/* Большая карточка слева */}
              {gallery[0] && (
                <Link
                  to="/gallery"
                  className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
                  style={{ background: 'var(--color-green-light)' }}
                >
                  <img src={gallery[0].image_url} alt={gallery[0].title ?? ''} className="w-full h-full object-cover" />
                  {gallery[0].title && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white text-sm font-medium" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
                      {gallery[0].title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}
              {/* Маленькие карточки справа */}
              {gallery.slice(1, 5).map((ph) => (
                <Link
                  key={ph.id}
                  to="/gallery"
                  className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group"
                  style={{ background: 'var(--color-green-light)' }}
                >
                  <img src={ph.image_url} alt={ph.title ?? ''} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-green)' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Бізге косылыныз</h2>
          <p className="text-green-200 mb-8 text-base">Волонтер болыныз немесе хабарлама жіберіныз</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white font-semibold rounded-md text-sm transition-opacity hover:opacity-90"
            style={{ color: 'var(--color-green)' }}
          >
            Байланыс
          </Link>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
