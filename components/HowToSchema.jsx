import JsonLd from './JsonLd';

/**
 * HowTo Schema Component
 * 
 * Displays HowTo structured data for tutorial/guide content
 * 
 * @param {string} name - Title of the how-to guide
 * @param {string} description - Brief description
 * @param {Array} steps - Array of {name, text, image?} objects
 * @param {number} totalTime - Total time in ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
 * 
 * Example:
 * <HowToSchema 
 *   name="How to Build an AI System"
 *   description="Step-by-step guide to building AI systems"
 *   totalTime="PT2H"
 *   steps={[
 *     { name: "Define the problem", text: "Start by clearly defining..." },
 *     { name: "Gather data", text: "Collect relevant data..." }
 *   ]}
 * />
 */
export default function HowToSchema({ name, description, steps, totalTime, image }) {
  if (!name || !steps || steps.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "image": image,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image,
      "url": step.url
    }))
  };

  return <JsonLd data={schema} />;
}
