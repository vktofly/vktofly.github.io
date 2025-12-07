"use client";

import { useState, useEffect } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import BookImageUploader from "../../components/admin/BookImageUploader";
import PersonImageUploader from "../../components/admin/PersonImageUploader";

export default function AdminPageClient({ books, people }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Private password - change this to your own secret password
  // For production, set NEXT_PUBLIC_ADMIN_PASSWORD in your environment variables
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "change-this-password";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setError("");
      // Store in sessionStorage for convenience (clears on browser close)
      sessionStorage.setItem("admin_authorized", "true");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    // Check if already authorized in this session
    if (sessionStorage.getItem("admin_authorized") === "true") {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) {
    return (
      <Section title="Admin Access" intro="Enter password to access admin panel">
        <Container>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition-colors"
              >
                Access Admin Panel
              </button>
            </form>
            <p className="mt-4 text-xs text-palette-secondary dark:text-zinc-500 text-center">
              Set NEXT_PUBLIC_ADMIN_PASSWORD in your environment variables for production
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      title="Admin Panel"
      intro="Upload book covers and profile photos. Updated data files will be generated for you to copy."
    >
      <Container>
        <div className="space-y-8">
          {/* Book Cover Uploader */}
          <div>
            <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-2">
              📚 Book Cover Images
            </h2>
            <p className="text-palette-secondary dark:text-zinc-400 mb-6">
              Drag and drop book cover images or select books to update their covers
            </p>
            <BookImageUploader books={books} />
          </div>

          {/* Person Photo Uploader */}
          <div>
            <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-2">
              👤 Profile Photos
            </h2>
            <p className="text-palette-secondary dark:text-zinc-400 mb-6">
              Drag and drop profile photos or select people to update their images
            </p>
            <PersonImageUploader people={people} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

