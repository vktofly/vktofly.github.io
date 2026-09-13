# Findings

## WebLLM Architecture Notes
- `@mlc-ai/web-llm` uses WebWorker to offload model inference from the main UI thread.
- Requires serving `mlc-llm` web worker script or bundling it.
- Model weights are stored in IndexedDB on the client.
- The `llms.txt` file is located at the root of the site, meaning it can be fetched via `fetch('/llms.txt')` at runtime to serve as the system prompt.
