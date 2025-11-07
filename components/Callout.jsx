export default function Callout({ type = 'info', children }) {
  const styles = {
    info: 'border-l-4 border-brand-500 bg-zinc-50 dark:bg-zinc-900',
    warning: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
    success: 'border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20',
    note: 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20',
  };
  return (
    <div className={`rounded-r-lg p-4 my-6 ${styles[type] || styles.info}`}>
      <div className="prose prose-sm max-w-none dark:prose-invert">{children}</div>
    </div>
  );
}

