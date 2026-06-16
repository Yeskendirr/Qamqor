import React, { useState } from 'react';
import { contactApi } from '../api';
import PageHeader from '../components/PageHeader';

interface Form { name: string; email: string; subject: string; message: string; }

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactApi.send(form);
      setDone(true);
    } catch {
      setError('Жіберілмеді. Кайталап кориніз.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Байланыс" subtitle="Бізге хабарлама жіберіныз немесе тікелей хабарласыныз" />

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
                  Мекенжай
                </p>
                <p className="text-sm">Алматы, Казакстан</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
                  Телефон
                </p>
                <p className="text-sm">+7 (727) 123-45-67</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
                  Email
                </p>
                <p className="text-sm">info@qamqor.kz</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-muted)' }}>
                  Жумыс уакыты
                </p>
                <p className="text-sm">Дуй–Жум: 9:00–18:00</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              {done ? (
                <div className="card p-10 text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 text-white font-bold"
                    style={{ background: 'var(--color-green)' }}
                  >
                    OK
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Хабарламаныз жіберілді</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                    Жакын арада сізге хабарласамыз.
                  </p>
                  <button onClick={() => { setDone(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-ghost">
                    Тагы жіберу
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label">Аты-жоні *</label>
                      <input className="field" type="text" required value={form.name} onChange={set('name')} placeholder="Атыныз" />
                    </div>
                    <div>
                      <label className="label">Email *</label>
                      <input className="field" type="email" required value={form.email} onChange={set('email')} placeholder="email@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Такырып</label>
                    <input className="field" type="text" value={form.subject} onChange={set('subject')} placeholder="Хабарламанын такырыбы" />
                  </div>
                  <div>
                    <label className="label">Хабарлама *</label>
                    <textarea className="field resize-none" rows={6} required value={form.message} onChange={set('message')} placeholder="Хабарламаныз..." />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                    {loading ? 'Жіберілуде...' : 'Жіберу'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
