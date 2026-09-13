import Section from "../../components/Section";
import React from "react";

export const metadata = {
  title: "API Documentation | Developers",
  description: "Consume Vikash's portfolio data as code.",
};

export default function DevelopersPage() {
  return (
    <Section title="Developers" intro="Consume this portfolio as an API.">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          I strongly believe in &quot;Data as Code&quot;. My entire professional history—projects, skills, and experience—is statically generated and served as JSON endpoints directly from the edge.
        </p>

        <h3>Available Endpoints</h3>
        
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-brand-600">GET /api/profile.json</span>
            <a href="/api/profile.json" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-500">View &rarr;</a>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 m-0 text-xs">Core contact and headline information.</p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-brand-600">GET /api/experience.json</span>
            <a href="/api/experience.json" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-500">View &rarr;</a>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 m-0 text-xs">Full professional work history.</p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 mb-4 font-mono text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-brand-600">GET /api/skills.json</span>
            <a href="/api/skills.json" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-500">View &rarr;</a>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 m-0 text-xs">Technical and meta-skill proficiencies.</p>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4 mb-8 font-mono text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-brand-600">GET /api/projects.json</span>
            <a href="/api/projects.json" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-500">View &rarr;</a>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 m-0 text-xs">Open source and private project portfolio.</p>
        </div>

        <h3>Usage Example</h3>
        <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{`// Fetch my latest skills directly into your application
const response = await fetch('https://vktofly.github.io/api/skills.json');
const skills = await response.json();
console.log(skills.technical);`}</code>
        </pre>
      </div>
    </Section>
  );
}
