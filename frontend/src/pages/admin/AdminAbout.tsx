import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { aboutApi } from '../../api';

const EMPTY = { title: '', description: '', mission: '', vision: '', founded_year: '', team_count: '' };

export default function AdminAbout() {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    aboutApi.get().then((r) => {
      const d = r.data;
      setForm({
        title: d.title ?? '',
        description: d.description ?? '',
        mission: d.mission ?? '',
        vision: d.vision ?? '',
        founded_year: d.founded_year?.toString() ?? '',
        team_count: d.team_count?.toString() ?? '',
      });
    });
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await aboutApi.update({ ...form, founded_year: Number(form.founded_year), team_count: Number(form.team_count) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-6">Корт туралы</h1>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div><label className="label">Корт атауы *</label><input className="field" required value={form.title} onChange={set('title')} /></div>
          <div><label className="label">Сипаттамасы *</label><textarea className="field resize-none" rows={4} required value={form.description} onChange={set('description')} /></div>
          <div><label className="label">Миссия</label><textarea className="field resize-none" rows={3} value={form.mission} onChange={set('mission')} /></div>
          <div><label className="label">Максат</label><textarea className="field resize-none" rows={3} value={form.vision} onChange={set('vision')} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label">Курылу жылы</label><input className="field" type="number" value={form.founded_year} onChange={set('founded_year')} /></div>
            <div><label className="label">Волонтерлер саны</label><input className="field" type="number" value={form.team_count} onChange={set('team_count')} /></div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <button className="btn-primary disabled:opacity-50" disabled={saving}>{saving ? 'Сакталуда...' : 'Сактау'}</button>
            {saved && <span className="text-sm" style={{ color: 'var(--color-green)' }}>Сакталды</span>}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
