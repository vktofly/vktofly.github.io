export default function Prose({ html }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  );
}


