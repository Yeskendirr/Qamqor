import React, { useEffect, useState } from 'react';
import { faqApi } from '../api';
import type { FaqItem } from '../types';
import PageHeader from '../components/PageHeader';
import Spinner from '../components/Spinner';

export default function FAQ() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    faqApi.getAll().then((r) => { setItems(r.data); setLoading(false); });
  }, []);

  return (
    <>
      <PageHeader title="FAQ" subtitle="Жиі койылатын сурактар" />
      <section className="section">
        <div className="container max-w-2xl">
          {loading ? <Spinner /> : items.length === 0 ? (
            <p className="text-center py-20" style={{ color: 'var(--color-muted)' }}>Сурактар жок</p>
          ) : (
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
                    <div className="px-6 pb-5 text-sm leading-relaxed border-t" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
