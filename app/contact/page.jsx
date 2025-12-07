"use client";

import { useState } from 'react';
import Section from '../../components/Section';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const action = id ? `https://formspree.io/f/${id}` : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!action) {
      setStatus('error');
      setMessage('Contact form is not configured. Please use the email address below.');
      return;
    }

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again or use the email address below.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section title="Contact" intro="Get in touch">
      <div className="max-w-xl">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-palette-primary dark:text-zinc-200">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-palette-primary dark:text-zinc-200">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm mb-1 text-palette-primary dark:text-zinc-200">
              Company (optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-1 text-palette-primary dark:text-zinc-200">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all resize-y"
              disabled={status === 'loading'}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'loading' || !action}
              className="inline-flex items-center rounded-md bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white px-4 py-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>
          </div>
          {message && (
            <div
              className={`text-sm ${
                status === 'success'
                  ? 'text-green-600 dark:text-green-400'
                  : status === 'error'
                  ? 'text-red-600 dark:text-red-400'
                  : ''
              }`}
            >
              {message}
            </div>
          )}
        </form>
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          Direct email: <a className="underline hover:text-brand-600 dark:hover:text-brand-400" href="mailto:vktofly@gmail.com">vktofly@gmail.com</a>
        </p>
      </div>
    </Section>
  );
}


