import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-16">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Vikash. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/vktofly" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">GitHub</a>
          <a href="https://x.com/vktofly1" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">X</a>
          <a href="https://linkedin.com/in/vktofly" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">LinkedIn</a>
        </div>
      </Container>
    </footer>
  );
}


