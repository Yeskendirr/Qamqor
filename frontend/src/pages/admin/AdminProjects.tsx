import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ImageInput from '../../components/ImageInput';
import { projectsApi, uploadImage } from '../../api';
import type { Project } from '../../types';

const EMPTY = { title: '', description: '', status: 'active', start_date: '', end_date: '', beneficiaries: 0, image_url: '' };

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const load = () => projectsApi.getAll().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: k === 'beneficiaries' ? Number(e.target.value) : e.target.value }));

  function openCreate() { setEditing(null); setForm(EMPTY); setImageFile(null); setShowForm(true); }
  function openEdit(item: Project) {
    setEditing(item);
    setForm({ title: item.title, description: item.description, status: item.status, start_date: item.start_date ?? '', end_date: item.end_date ?? '', beneficiaries: item.beneficiaries, image_url: item.image_url ?? '' });
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
      editing ? await projectsApi.update(editing.id, data) : await projectsApi.create(data);
      setShowForm(false);
      load();
    } catch {
      setSaveError('Сақтау кезінде қате шықты. Қайталап көріңіз.');
    } finally {
      setSaving(false);
    }
  }

  async function del(id: number) {
    if (!confirm('Өшіру?')) return;
    try {
      await projectsApi.delete(id);
      load();
    } catch {
      alert('Жою кезінде қате шықты.');
    }
  }

  if (showForm) return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editing ? 'Жобаны өңдеу' : 'Жоба қосу'}</h1>
        <button onClick={() => setShowForm(false)} className="text-sm" style={{ color: 'var(--color-muted)' }}>&larr; Тізімге</button>
      </div>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div><label className="label">Атауы *</label><input className="field" required value={form.title} onChange={set('title')} /></div>
          <div><label className="label">Сипаттамасы *</label><textarea className="field resize-none" rows={6} required value={form.description} onChange={set('description')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Күйі</label>
              <select className="field" value={form.status} onChange={set('status')}>
                <option value="active">Белсенді</option>
                <option value="completed">Аяқталды</option>
                <option value="paused">Тоқтатылды</option>
              </select>
            </div>
            <div><label className="label">Басталу күні</label><input className="field" type="date" value={form.start_date} onChange={set('start_date')} /></div>
          </div>
          <div><label className="label">Аяқталу күні</label><input className="field" type="date" value={form.end_date} onChange={set('end_date')} /></div>
          <div><label className="label">Қамтылған адамдар</label><input className="field" type="number" min={0} value={form.beneficiaries} onChange={set('beneficiaries')} /></div>
          <div>
            <label className="label">Сурет</label>
            <ImageInput
              currentUrl={form.image_url || null}
              onFileSelect={setImageFile}
              onUrlChange={(url) => setForm((p) => ({ ...p, image_url: url }))}
            />
          </div>
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
        <h1 className="text-xl font-bold">Жобалар</h1>
        <button onClick={openCreate} className="btn-primary">+ Қосу</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: 'var(--color-surface)', borderBottom: `1px solid var(--color-border)` }}>
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Атауы</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Күйі</th>
              <th className="text-left px-5 py-3 text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Адамдар</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-5 py-3.5 font-medium max-w-xs truncate">{item.title}</td>
                <td className="px-5 py-3.5"><span className={item.status === 'active' ? 'tag tag-green' : 'tag tag-gray'}>{item.status === 'active' ? 'Белсенді' : 'Аяқталды'}</span></td>
                <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--color-muted)' }}>{item.beneficiaries.toLocaleString()}</td>
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
