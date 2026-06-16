import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ImageInput from '../../components/ImageInput';
import { eventsApi, uploadImage } from '../../api';
import type { Event } from '../../types';

const EMPTY = { title: '', description: '', event_date: '', location: '', image_url: '' };

export default function AdminEvents() {
  const [items, setItems] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => eventsApi.getAll().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  function openCreate() { setEditing(null); setForm(EMPTY); setImageFile(null); setShowForm(true); }
  function openEdit(item: Event) {
    setEditing(item);
    setForm({ title: item.title, description: item.description, event_date: item.event_date, location: item.location ?? '', image_url: item.image_url ?? '' });
    setImageFile(null);
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let image_url = form.image_url;
    if (imageFile) {
      image_url = await uploadImage(imageFile);
    } else if (!image_url && editing?.image_url) {
      image_url = editing.image_url;
    }
    const data = { ...form, image_url };
    editing ? await eventsApi.update(editing.id, data) : await eventsApi.create(data);
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function del(id: number) {
    if (!confirm('Өшіру?')) return;
    await eventsApi.delete(id);
    load();
  }

  if (showForm) return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editing ? 'Іс-шараны өңдеу' : 'Іс-шара қосу'}</h1>
        <button onClick={() => setShowForm(false)} className="text-sm" style={{ color: 'var(--color-muted)' }}>&larr; Тізімге</button>
      </div>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div><label className="label">Атауы *</label><input className="field" required value={form.title} onChange={set('title')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Күні *</label><input className="field" type="date" required value={form.event_date} onChange={set('event_date')} /></div>
            <div><label className="label">Орны</label><input className="field" value={form.location} onChange={set('location')} /></div>
          </div>
          <div><label className="label">Сипаттамасы *</label><textarea className="field resize-none" rows={5} required value={form.description} onChange={set('description')} /></div>
          <div>
            <label className="label">Сурет</label>
            <ImageInput
              currentUrl={form.image_url || null}
              onFileSelect={setImageFile}
              onUrlChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
            />
          </div>
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
        <h1 className="text-xl font-bold">Іс-шаралар</h1>
        <button onClick={openCreate} className="btn-primary">+ Қосу</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Атауы</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Күні</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Орны</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-medium max-w-xs truncate">{item.title}</td>
                <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--color-muted)' }}>{new Date(item.event_date).toLocaleDateString('ru-RU')}</td>
                <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--color-muted)' }}>{item.location ?? '—'}</td>
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
