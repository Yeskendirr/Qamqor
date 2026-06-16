import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <section className="py-16 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container">
        <Breadcrumbs />
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-base" style={{ color: 'var(--color-muted)' }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
