import React, { useEffect, useState } from 'react';
import { galleryApi } from '../api';
import type { GalleryItem } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    galleryApi.getAll().then((r) => { setPhotos(r.data); setLoading(false); });
  }, []);

  return (
    <>
      <PageHeader title="Галерея" subtitle="Іс-шаралар мен жобалардын суреттері" />
      <section className="section">
        <div className="container">
          {loading ? <Spinner /> : photos.length === 0 ? (
            <p className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Суреттер жок</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {photos.map((ph) => (
                <button
                  key={ph.id}
                  className="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity cursor-zoom-in"
                  style={{ background: 'var(--color-green-light)' }}
                  onClick={() => setLightbox(ph)}
                >
                  <img src={ph.image_url} alt={ph.title || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-8 right-0 text-white/70 hover:text-white text-lg"
              onClick={() => setLightbox(null)}
            >
              Жабу &times;
            </button>
            <img
              src={lightbox.image_url}
              alt={lightbox.title || ''}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            {lightbox.title && (
              <p className="text-center text-white/70 text-sm mt-3">{lightbox.title}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
