import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ImageInput from '../../components/ImageInput';
import { newsApi, uploadImage } from '../../api';
import type { NewsItem } from '../../types';

const EMPTY = { title: '', content: '', excerpt: '', image_url: '', is_published: 1 };

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const load = () => newsApi.getAllAdmin().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  function openCreate() { setEditing(null); setForm(EMPTY); setImageFile(null); setShowForm(true); }
  function openEdit(item: NewsItem) {
    setEditing(item);
    setForm({ title: item.title, content: item.content, excerpt: item.excerpt ?? '', image_url: item.image_url ?? '', is_published: item.is_published });
    setImageFile(null);
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      let image_url = form.image_url;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      } else if (!image_url && editing?.image_url) {
        image_url = editing.image_url;
      }
      const data = { ...form, image_url };
      editing ? await newsApi.update(editing.id, data) : await newsApi.create(data);
      setShowForm(false);
      load();
    } catch {
      setSaveError('Сақтау кезінде қате шықты. Қайталап көріңіз.');
    } finally {
      setSaving(false);
    }
  }

  async function del(id: number) {
    if (!confirm('Өшіру керек пе?')) return;
    try {
      await newsApi.delete(id);
      load();
    } catch {
      alert('Жою кезінде қате шықты.');
    }
  }

  if (showForm) return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editing ? 'Жаңалықты өңдеу' : 'Жаңалық қосу'}</h1>
        <button onClick={() => setShowForm(false)} className="text-sm" style={{ color: 'var(--color-muted)' }}>&larr; Тізімге</button>
      </div>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div><label className="label">Тақырып *</label><input className="field" required value={form.title} onChange={set('title')} /></div>
          <div><label className="label">Қысқа сипаттама</label><input className="field" value={form.excerpt} onChange={set('excerpt')} /></div>
          <div><label className="label">Мазмұны *</label><textarea className="field resize-none" rows={10} required value={form.content} onChange={set('content')} /></div>
          <div>
            <label className="label">Сурет</label>
            <ImageInput
              currentUrl={form.image_url || null}
              onFileSelect={setImageFile}
              onUrlChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
            />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_published === 1} onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked ? 1 : 0 }))} />
            Жариялау
          </label>
          {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
          <div className="flex gap-3 pt-2">
            <button className="btn-primary disabled:opacity-50" disabled={saving}>{saving ? 'Сақталуда...' : 'Сақтау'}</button>
            <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Бас тарту</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Жаңалықтар</h1>
        <button onClick={openCreate} className="btn-primary">+ Қосу</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Тақырып</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Күні</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Күйі</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-medium max-w-xs truncate">{item.title}</td>
                <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--color-muted)' }}>{new Date(item.published_at).toLocaleDateString('ru-RU')}</td>
                <td className="px-5 py-3.5"><span className={item.is_published ? 'tag tag-green' : 'tag tag-gray'}>{item.is_published ? 'Жарияланған' : 'Жасырын'}</span></td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={() => openEdit(item)} className="text-xs mr-3" style={{ color: 'var(--color-green)' }}>Өңдеу</button>
                  <button onClick={() => del(item.id)} className="text-xs text-red-500">Өшіру</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-sm" style={{ color: 'var(--color-muted)' }}>Жоқ</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
