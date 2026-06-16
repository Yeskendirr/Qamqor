import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ImageInput from '../../components/ImageInput';
import { galleryApi } from '../../api';
import type { GalleryItem } from '../../types';

export default function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [formKey, setFormKey] = useState(0);

  const load = () => galleryApi.getAll().then((r) => setPhotos(r.data));
  useEffect(() => { load(); }, []);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile && !imageUrl) return;
    const fd = new FormData();
    if (title) fd.append('title', title);
    if (imageFile) fd.append('image', imageFile);
    else fd.append('image_url', imageUrl);
    setUploading(true);
    await galleryApi.upload(fd);
    setUploading(false);
    setTitle('');
    setImageFile(null);
    setImageUrl('');
    setFormKey((k) => k + 1);
    load();
  }

  async function del(id: number) {
    if (!confirm('Өшіру?')) return;
    await galleryApi.delete(id);
    load();
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-6">Галерея</h1>

      <div className="card p-5 mb-6 max-w-md">
        <form onSubmit={upload} className="space-y-3">
          <div><label className="label">Сурет атауы</label><input className="field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Міндетті емес" /></div>
          <div>
            <label className="label">Сурет *</label>
            <ImageInput
              key={formKey}
              onFileSelect={setImageFile}
              onUrlChange={setImageUrl}
            />
          </div>
          <button
            className="btn-primary disabled:opacity-50"
            disabled={uploading || (!imageFile && !imageUrl)}
          >
            {uploading ? 'Жүктелуде...' : 'Жүктеу'}
          </button>
        </form>
      </div>

      {photos.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Суреттер жоқ</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {photos.map((ph) => (
            <div key={ph.id} className="relative group aspect-square rounded-lg overflow-hidden" style={{ background: 'var(--color-green-light)' }}>
              <img src={ph.image_url} alt={ph.title ?? ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => del(ph.id)} className="text-white text-xs bg-red-500 px-3 py-1.5 rounded-md">
                  Өшіру
                </button>
              </div>
              {ph.title && (
                <div className="absolute bottom-0 left-0 right-0 text-white text-xs px-2 py-1 truncate" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  {ph.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
