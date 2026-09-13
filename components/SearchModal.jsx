'use client';

import { useState, useEffect, useRef } from 'react';
import { search } from '@orama/orama';
import { restore } from '@orama/plugin-data-persistence';
import Link from 'next/link';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [db, setDb] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      if (!db && !isLoading) {
        setIsLoading(true);
        fetch('/search-index.json')
          .then(res => res.text())
          .then(rawData => restore('json', rawData))
          .then(restoredDb => {
            setDb(restoredDb);
            setIsLoading(false);
          })
          .catch(err => {
            console.error('Failed to load search index', err);
            setIsLoading(false);
          });
      }
    }
  }, [isOpen, db, isLoading]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!db || !query.trim()) {
      setResults([]);
      return;
    }

    const performSearch = async () => {
      const result = await search(db, {
        term: query,
        tolerance: 1,
        limit: 10,
        properties: ['title', 'content']
      });
      setResults(result.hits);
    };

    performSearch();
  }, [query, db]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-24 px-4 pb-4">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-4 bg-transparent border-0 focus:ring-0 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
            placeholder={isLoading ? "Loading index..." : "Search posts, projects, books..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="px-2 text-xs font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded">ESC</button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.map((hit) => (
              <Link
                key={hit.id}
                href={hit.document.url}
                onClick={onClose}
                className="flex flex-col px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-palette-primary dark:text-palette-light uppercase tracking-wider">
                    {hit.document.type}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {hit.document.title}
                  </span>
                </div>
                {hit.document.content && (
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {hit.document.content.substring(0, 150)}...
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && !isLoading && (
          <div className="p-8 text-center text-zinc-500">
            No results found for &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
