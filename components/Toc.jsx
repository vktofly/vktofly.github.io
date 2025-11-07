'use client';

import { useEffect, useState } from 'react';

export default function Toc({ rootId = 'article-content' }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    const hs = root.querySelectorAll('h2, h3');
    const list = Array.from(hs).map((h) => ({
      id: h.id,
      text: h.textContent || '',
      level: h.tagName.toLowerCase(),
    }));
    setItems(list);
  }, [rootId]);

  if (!items.length) return null;

  return (
    <nav className="text-sm text-palette-secondary">
      <div className="font-semibold mb-2 text-palette-primary">On this page</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it.id} className={it.level === 'h3' ? 'ml-3' : ''}>
            <a href={`#${it.id}`} className="hover:text-brand-600">{it.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


