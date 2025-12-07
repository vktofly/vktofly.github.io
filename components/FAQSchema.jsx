import JsonLd from './JsonLd';

/**
 * FAQ Schema Component
 * 
 * Displays FAQ structured data for better search result appearance
 * 
 * @param {Array} faqs - Array of {question, answer} objects
 * 
 * Example:
 * <FAQSchema faqs={[
 *   { question: "What is AGI?", answer: "Artificial General Intelligence..." },
 *   { question: "How does quantum computing work?", answer: "Quantum computing..." }
 * ]} />
 */
export default function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <JsonLd data={schema} />;
}
