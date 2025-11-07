This is mypersonal professional portfolio for GitHub Pages at vktofly.github.io.
Built with Next.js App Router (static export), Tailwind CSS, dark/light theme, Inter + JetBrains Mono.
Structure: Home (hero + featured projects), About, Experience, Projects, Skills, Vision, Contact.
Content: long-form aboutme.md and myvision.md rendered as Markdown; structured data in data/ for projects/experience/skills; profile photo from public/proflephoto/profile photo.jpg.
UI: reusable components (Header, Footer, ThemeToggle, Section, ProjectCard, ExperienceItem, ProfilePhoto).
SEO/analytics: metadata and next-sitemap for sitemap.xml/robots.txt; Google Analytics via NEXT_PUBLIC_GA_ID.
Deployment: GitHub Actions builds and exports to out/, publishes to GitHub Pages; custom domain can be added later.

what we have achived so far:
Built portfolio with Next.js App Router + Tailwind, dark/light theme, Inter + JetBrains Mono.
Set up static export for GitHub Pages (output: 'export', unoptimized images, trailingSlash).
Created reusable UI: Header, Footer, ThemeToggle, Section, Container, ProjectCard, ExperienceItem, Prose, ProfilePhoto.
Implemented pages: Home (hero + featured), About, Experience, Projects, Skills, Vision (Markdown), Contact, not-found.
Integrated Markdown pipeline for content/aboutme.md and content/myvision.md.
Added profile photo on Home and About from public/proflephoto/profile photo.jpg.
Wired SEO basics + next-sitemap (sitemap.xml, robots.txt).
Added Google Analytics via NEXT_PUBLIC_GA_ID (env-based; workflow passes secret).
Configured GitHub Actions workflow to build and deploy to GitHub Pages.
Cleaned up legacy Pages Router; everything runs under app/.
