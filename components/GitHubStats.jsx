import React from "react";
import fs from "fs";
import path from "path";

export default function GitHubStats() {
  let stats = null;
  try {
    const filePath = path.join(process.cwd(), "public", "data", "github-stats.json");
    if (fs.existsSync(filePath)) {
      stats = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {
    console.error("Error reading GitHub stats", err);
  }

  if (!stats) return null;

  return (
    <div className="mt-8 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 flex flex-col sm:flex-row items-center gap-4 animate-fade-in text-sm font-mono text-zinc-600 dark:text-zinc-400">
      <img src={stats.avatar_url} alt="GitHub Avatar" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <strong className="text-zinc-900 dark:text-zinc-100">github.com/{stats.username}</strong>
          <span className="text-xs px-2 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded">
            Live (Build Time)
          </span>
        </div>
        <div>
          {stats.public_repos} Repositories • {stats.followers} Followers
        </div>
        {stats.latest_event && (
          <div className="text-xs mt-1 text-zinc-500">
            Last active: {stats.latest_event.type} in {stats.latest_event.repo}
          </div>
        )}
      </div>
    </div>
  );
}
