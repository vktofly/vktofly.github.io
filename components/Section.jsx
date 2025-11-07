import Container from './Container';

export default function Section({ title, intro, children, className = '' }) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>
        {title && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            {intro && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{intro}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}


