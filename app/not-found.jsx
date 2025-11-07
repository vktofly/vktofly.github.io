export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Page not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="inline-flex items-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-4 py-2">Go home</a>
    </div>
  );
}


