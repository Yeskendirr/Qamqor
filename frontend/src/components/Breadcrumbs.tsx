import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PATH_LABELS: Record<string, string> = {
  about: 'Қор туралы',
  news: 'Жаналыктар',
  projects: 'Жобалар',
  events: 'Іс-шаралар',
  gallery: 'Галерея',
  contact: 'Байланыс',
  contacts: 'Хабарлар',
  faq: 'FAQ',
  admin: 'Dashboard',
};

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const { pathname } = useLocation();

  const crumbs: BreadcrumbItem[] = items ?? (() => {
    const segments = pathname.split('/').filter(Boolean);
    const isAdmin = segments[0] === 'admin';

    const result: BreadcrumbItem[] = isAdmin
      ? [{ label: 'Dashboard', to: '/admin' }]
      : [{ label: 'Басты бет', to: '/' }];

    let accPath = isAdmin ? '/admin' : '';
    const startIdx = isAdmin ? 1 : 0;

    for (let i = startIdx; i < segments.length; i++) {
      const seg = segments[i];
      accPath += `/${seg}`;
      const label = PATH_LABELS[seg] ?? seg;
      const isLast = i === segments.length - 1;
      result.push({ label, to: isLast ? undefined : accPath });
    }

    return result;
  })();

  if (crumbs.length <= 1) return null;

  return (
    <nav className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: 'var(--color-border)' }}>/</span>}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-green-800 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
