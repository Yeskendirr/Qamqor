import React, { useEffect, useState } from 'react';
import { faqApi } from '../api';
import type { FaqItem } from '../types';

export default function FaqSection() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    faqApi.getAll().then((r) => setItems(r.data));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="border-t py-16" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="container max-w-2xl">
        <h2 className="text-2xl font-bold mb-8">Жиі қойылатын сұрақтар</h2>
        <div className="space-y-2">
          {items.map((faq) => (
            <div key={faq.id} className="card overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                <span
                  className="shrink-0 text-lg transition-transform leading-none"
                  style={{
                    transform: open === faq.id ? 'rotate(45deg)' : 'none',
                    color: 'var(--color-green)',
                  }}
                >
                  +
                </span>
              </button>
              {open === faq.id && (
                <div
                  className="px-6 pb-5 text-sm leading-relaxed border-t"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
                >
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
