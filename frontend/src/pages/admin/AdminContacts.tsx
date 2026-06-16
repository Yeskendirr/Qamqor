import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { contactApi } from '../../api';
import type { ContactMessage } from '../../types';

export default function AdminContacts() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const load = () => contactApi.getAll().then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  async function markRead(id: number) {
    await contactApi.markRead(id);
    load();
  }

  async function del(id: number) {
    if (!confirm('Ошіру?')) return;
    await contactApi.delete(id);
    setSelected(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Хабарлар</h1>
        <button onClick={load} className="btn-ghost text-xs">Жаңарту</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card overflow-hidden">
          <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {items.length === 0 && <p className="text-sm text-center py-10" style={{ color: 'var(--color-muted)' }}>Хабарлар жок</p>}
            {items.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left px-5 py-4 transition-colors hover:bg-gray-50 ${selected?.id === item.id ? 'bg-green-50' : ''}`}
                onClick={() => { setSelected(item); if (!item.is_read) markRead(item.id); }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${item.is_read ? 'text-gray-600' : 'font-semibold'}`}>{item.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.subject ?? item.message.slice(0, 40)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    {!item.is_read && <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--color-green)' }} />}
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{new Date(item.created_at).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="card p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-semibold">{selected.name}</h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{selected.email}</p>
              </div>
              <button onClick={() => del(selected.id)} className="text-xs text-red-500 hover:underline">Ошіру</button>
            </div>
            {selected.subject && <p className="text-sm font-medium mb-3">{selected.subject}</p>}
            <p className="text-sm leading-relaxed" style={{ color: '#444' }}>{selected.message}</p>
            <p className="text-xs mt-5" style={{ color: 'var(--color-muted)' }}>
              {new Date(selected.created_at).toLocaleString('ru-RU')}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
