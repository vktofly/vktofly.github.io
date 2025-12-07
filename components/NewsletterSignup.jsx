"use client";

import { useState } from "react";

export default function NewsletterSignup({ className = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.trim()) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    // TODO: Replace with your actual newsletter signup endpoint
    // This is a placeholder implementation
    try {
      // Example: await fetch('/api/newsletter', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email.trim() }) 
      // })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For now, just show success message
      setStatus("success");
      setMessage("Thank you! You've been subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-950/30 dark:to-transparent p-6 sm:p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-600/10 dark:from-brand-600/20 dark:to-brand-700/20 flex items-center justify-center border border-brand-500/20 dark:border-brand-600/30">
          <span className="text-xl">📬</span>
        </div>
        <h3 className="font-bold text-xl text-palette-primary dark:text-zinc-100">
          Stay Updated
        </h3>
      </div>
      <p className="text-base text-palette-secondary dark:text-zinc-400 mb-6 leading-relaxed">
        Get insights on systems thinking, knowledge creation, and building the future. 
        No spam, just thoughtful content.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 placeholder-palette-secondary dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
            disabled={status === "loading"}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim()}
            className="px-6 py-3 rounded-lg bg-brand-500 dark:bg-brand-600 text-white font-medium hover:bg-brand-600 dark:hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        
        {message && (
          <div
            className={`text-sm ${
              status === "success"
                ? "text-green-600 dark:text-green-400"
                : status === "error"
                ? "text-red-600 dark:text-red-400"
                : ""
            }`}
          >
            {message}
          </div>
        )}
      </form>
      
      <p className="text-xs text-palette-secondary dark:text-zinc-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}

