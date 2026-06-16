import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { faqApi } from '../../api';
import type { FaqItem } from '../../types';

const EMPTY = { question: '', answer: '', sort_order: 0 };

export default function AdminFAQ() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => faqApi.getAll().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: k === 'sort_order' ? Number(e.target.value) : e.target.value }));

  function openCreate() { setEditing(null); setForm(EMPTY); setShowForm(true); }
  function openEdit(item: FaqItem) {
    setEditing(item);
    setForm({ question: item.question, answer: item.answer, sort_order: item.sort_order });
    setShowForm(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    editing ? await faqApi.update(editing.id, form) : await faqApi.create(form);
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function del(id: number) {
    if (!confirm('Ошіру?')) return;
    await faqApi.delete(id);
    load();
  }

  if (showForm) return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editing ? 'Суракты онделу' : 'Сурак косу'}</h1>
        <button onClick={() => setShowForm(false)} className="text-sm" style={{ color: 'var(--color-muted)' }}>&larr; Тізімге</button>
      </div>
      <div className="card p-6 max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div><label className="label">Сурак *</label><input className="field" required value={form.question} onChange={set('question')} /></div>
          <div><label className="label">Жауап *</label><textarea className="field resize-none" rows={5} required value={form.answer} onChange={set('answer')} /></div>
          <div><label className="label">Ретті</label><input className="field" type="number" value={form.sort_order} onChange={set('sort_order')} /></div>
          <div className="flex gap-3 pt-2">
            <button className="btn-primary disabled:opacity-50" disabled={saving}>{saving ? 'Сакталуда...' : 'Сактау'}</button>
            <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Бас тарту</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">FAQ</h1>
        <button onClick={openCreate} className="btn-primary">+ Косу</button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.question}</p>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.answer}</p>
              </div>
              <div className="shrink-0 flex gap-3">
                <button onClick={() => openEdit(item)} className="text-xs" style={{ color: 'var(--color-green)' }}>Онделу</button>
                <button onClick={() => del(item.id)} className="text-xs text-red-500">Ошіру</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Сурактар жок</p>}
      </div>
    </AdminLayout>
  );
}
