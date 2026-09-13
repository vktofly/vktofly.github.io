'use client';

import { useState, useEffect, useRef } from 'react';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';
import { restore } from '@orama/plugin-data-persistence';
import { search } from '@orama/orama';

export default function AITwinChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [engine, setEngine] = useState(null);
  const [progressText, setProgressText] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [searchDb, setSearchDb] = useState(null);
  const messagesEndRef = useRef(null);

  const startChat = async () => {
    try {
      setHasStarted(true);
      setIsInitializing(true);
      setProgressText('Downloading AI Twin model (~2GB). This happens once and runs entirely in your browser via WebGPU...');
      
      // Fetch compact context
      const contextRes = await fetch('/llms-small.txt');
      const contextText = await contextRes.text();

      let profileData = {};
      try {
        const profileRes = await fetch('/api/profile.json');
        profileData = await profileRes.json();
      } catch (e) {
        console.warn('Could not fetch profile.json', e);
      }

      // Load Orama Search Index
      try {
        const oramaRes = await fetch('/search-index.json');
        const rawOramaData = await oramaRes.text();
        const db = await restore('json', rawOramaData);
        setSearchDb(db);
      } catch (e) {
        console.warn('Could not load Orama search index', e);
      }

      const worker = new Worker(new URL('../lib/worker.js', import.meta.url), { type: 'module' });
      const initProgressCallback = (initProgress) => {
        setProgressText(initProgress.text);
      };
      
      const selectedModel = 'Phi-3-mini-4k-instruct-q4f16_1-MLC';
      const newEngine = await CreateWebWorkerMLCEngine(worker, selectedModel, { initProgressCallback });
      
      setEngine(newEngine);
      setProgressText('');
      setIsInitializing(false);
      
      const systemPrompt = `You are Vikash's Digital Twin. You are an AI representation of Vikash Kumar running entirely in the user's browser via WebGPU. 
Your goal is to answer questions about Vikash's work, thoughts, and skills. 
Here is a summary of Vikash: 
${JSON.stringify(profileData, null, 2)}

Here is a summary of his writings and ideas:
${contextText}

Always answer in the first person ("I am Vikash...", "My philosophy is..."). Be confident, visionary, and polite.`;

      setMessages([
        { role: 'system', content: systemPrompt },
        { role: 'assistant', content: 'Initialization complete. The matrix is loaded. I am Vikash\'s Digital Twin, running locally in your browser via WebGPU. Ask me anything about my projects, philosophy, or vision for infinite growth.' }
      ]);
    } catch (error) {
      console.error(error);
      setProgressText('Failed to initialize model. Your device or browser might not support WebGPU. Try using the latest version of Chrome on desktop.');
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, progressText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !engine || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let augmentedInput = input;
      
      // Perform RAG if search DB is loaded
      if (searchDb) {
        const searchResults = await search(searchDb, {
          term: input,
          limit: 3,
        });
        
        if (searchResults.hits.length > 0) {
          const contextSnippets = searchResults.hits
            .map(h => `[Source: ${h.document.title}]\n${h.document.content.substring(0, 500)}`)
            .join('\n\n');
            
          augmentedInput = `Context from Vikash's website and projects:\n${contextSnippets}\n\nUser Question: ${input}\n\n(Answer naturally based on the context if it's relevant, otherwise use your general knowledge. Do not mention that you were given context.)`;
        }
      }

      // We only send the augmented message to the LLM, keeping the UI message clean
      const msgsForModel = [...messages, { role: 'user', content: augmentedInput }];
      const reply = await engine.chat.completions.create({
        messages: msgsForModel,
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply.choices[0].message.content }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto bg-white dark:bg-cosmic-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-cosmic-900">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
            Vikash&apos;s Digital Twin
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">100% Client-Side. Zero Server. Powered by WebGPU & WebLLM.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-zinc-50/50 dark:bg-cosmic-950/50">
        
        {!hasStarted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/80 dark:bg-cosmic-950/80 backdrop-blur-sm z-10">
            <div className="max-w-md space-y-6">
              <div className="w-20 h-20 mx-auto bg-zinc-100 dark:bg-white/5 rounded-full flex items-center justify-center border border-zinc-200 dark:border-white/10">
                <svg className="w-10 h-10 text-cosmic-600 dark:text-cosmic-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Initialize AI Twin</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  This will download a ~2GB AI model (Phi-3) directly into your browser&apos;s cache. 
                  It runs entirely on your local GPU, meaning complete privacy and zero server latency.
                </p>
              </div>
              <button
                onClick={startChat}
                className="w-full py-4 rounded-xl font-semibold bg-cosmic-900 text-white dark:bg-white dark:text-cosmic-900 hover:scale-[1.02] transition-transform shadow-lg"
              >
                Start Download & Initialize
              </button>
            </div>
          </div>
        ) : null}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.filter(m => m.role !== 'system').map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-cosmic-900 text-white dark:bg-white dark:text-cosmic-900 rounded-tr-sm shadow-md'
                    : 'bg-white text-zinc-900 dark:bg-cosmic-900 dark:text-zinc-100 border border-zinc-200 dark:border-white/10 rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isInitializing && progressText && (
            <div className="flex justify-center p-4">
              <div className="bg-white dark:bg-cosmic-900 border border-zinc-200 dark:border-white/10 px-6 py-4 rounded-xl shadow-lg max-w-lg w-full text-center space-y-3">
                <div className="w-6 h-6 border-2 border-cosmic-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{progressText}</p>
              </div>
            </div>
          )}

          {isLoading && !isInitializing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-cosmic-900 border border-zinc-200 dark:border-white/10 p-4 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1.5 items-center h-6">
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-cosmic-900 border-t border-zinc-200 dark:border-white/10">
        <div className="flex gap-3 max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!engine || isLoading || isInitializing}
            placeholder={isInitializing ? 'Downloading model...' : 'Message Vikash&apos;s Digital Twin...'}
            className="flex-1 px-6 py-4 rounded-xl border border-zinc-300 dark:border-white/20 bg-zinc-50 dark:bg-cosmic-950 focus:outline-none focus:ring-2 focus:ring-cosmic-500 disabled:opacity-50 transition-shadow"
          />
          <button
            type="submit"
            disabled={!engine || isLoading || isInitializing || !input.trim()}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-lg font-medium bg-cosmic-900 text-white dark:bg-white dark:text-cosmic-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cosmic-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
