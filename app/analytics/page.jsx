"use client";

import { useState, useEffect } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import { getSectionViewStats, clearAnalyticsData } from "../../lib/analytics";

export default function AnalyticsPage() {
  const [stats, setStats] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setStats(getSectionViewStats());
  }, []);

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all analytics data?")) {
      clearAnalyticsData();
      setStats([]);
    }
  };

  if (!isClient) {
    return (
      <Section title="Analytics" intro="Loading analytics data...">
        <Container>
          <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
            Loading...
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section title="Section Analytics" intro="View which sections are most viewed on your site">
      <Container>
        <div className="max-w-4xl mx-auto">
          {stats.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
                No analytics data yet. Visit different sections to start tracking.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-palette-secondary dark:text-zinc-400">
                  {stats.length} section{stats.length !== 1 ? "s" : ""} tracked
                </p>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
                >
                  Clear Data
                </button>
              </div>

              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.sectionId}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 font-bold text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                            {stat.sectionName}
                          </h3>
                        </div>
                        <p className="text-sm text-palette-secondary dark:text-zinc-400">
                          ID: {stat.sectionId}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                          {stat.viewCount}
                        </div>
                        <div className="text-xs text-palette-secondary dark:text-zinc-500">
                          view{stat.viewCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 rounded-full transition-all duration-500"
                          style={{
                            width: `${(stat.viewCount / stats[0].viewCount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Additional info */}
                    <div className="flex items-center gap-4 text-xs text-palette-secondary dark:text-zinc-500">
                      {stat.lastViewed && (
                        <span>
                          Last viewed:{" "}
                          {new Date(stat.lastViewed).toLocaleDateString()}
                        </span>
                      )}
                      <span>Total views: {stat.totalViews}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}

