# LLM & AI Optimization Guide

This project is optimized for Large Language Models (LLMs) and AI agents (like Claude, ChatGPT, Perplexity).

## Strategy

1.  **`llms.txt`**: This file at the root (`/llms.txt`) tells AI agents what this site is about and where to find core content. It follows the [standard proposal](https://llmstxt.org/).
2.  **Full Content Context**: We generate a `public/llms-full.txt` file during build time. This file concatenates all markdown content from the site into a single text file. This allows an AI to "read" the entire site in one request, vastly improving the quality of answers it can give about Vikash.
3.  **Semantic HTML**: The site uses proper `<article>`, `<section>`, and `<nav>` tags which help LLMs understand the hierarchy of information.
4.  **Structured Data**: Extensive JSON-LD allows machines to parse entities (Person, Article, SoftwareApplication) unambiguously.

## How to Maintain

The system is automated.

-   **Generation Script**: `scripts/generate-llms-context.js` runs automatically before `next build`.
-   **Manual Run**: You can run `node scripts/generate-llms-context.js` to regenerate the files manually.

## Files Generated
-   `llms.txt`: The root entry point for AI agents (following llms.txt standard).
-   `public/llms.txt`: The public entry point for AI agents.
-   `public/llms-full.txt`: The complete content dump.
-   `public/llms-small.txt`: A condensed summary of content (useful for context-window constrained models).

## Robots.txt
We explicitly allow `GPTBot` and `CCBot` (Common Crawl) in `app/layout.jsx` metadata to ensure the site is indexed by major AI labs.

