import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// A handler that takes care of all the WebLLM engine logic in the worker thread.
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg) => {
  handler.onmessage(msg);
};
