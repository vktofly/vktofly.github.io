'use client';
import { useState, useEffect, useRef } from 'react';
import { CreateWebWorkerMLCEngine } from '@mlc-ai/web-llm';

export default function DigitalTwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [engine, setEngine] = useState(null);
  const [progressText, setProgressText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && !engine && !progressText) {
      const initEngine = async () => {
        try {
          setProgressText('Loading Digital Twin... (Downloading model, this may take a minute)');
          
          // Fetch context from llms.txt
          const contextRes = await fetch('/llms.txt');
          const contextText = await contextRes.text();

          const worker = new Worker(new URL('../lib/worker.js', import.meta.url), { type: 'module' });
          const initProgressCallback = (initProgress) => {
            setProgressText(initProgress.text);
          };
          
          // Use a smaller model like Phi-3 for faster downloads on web
          const selectedModel = 'Phi-3-mini-4k-instruct-q4f16_1-MLC';
          const newEngine = await CreateWebWorkerMLCEngine(worker, selectedModel, { initProgressCallback });
          
          setEngine(newEngine);
          setProgressText('');
          
          setMessages([
            { role: 'system', content: `You are Vikash's Digital Twin. Use the following context to answer questions about him:\n\n${contextText}` },
            { role: 'assistant', content: 'Hi! I am Vikash\'s Digital Twin. Ask me anything about his projects, skills, or blog posts. Note: I run entirely in your browser using WebGPU!' }
          ]);
        } catch (error) {
          console.error(error);
          setProgressText('Failed to initialize model. Your device/browser might not support WebGPU.');
        }
      };
      initEngine();
    }
  }, [isOpen, engine, progressText]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !engine || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Don't send the entire history if it gets too long, but for a portfolio it's fine
      const msgsForModel = [...messages, userMessage];
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-palette-primary text-white shadow-xl hover:scale-105 transition-transform z-50 flex items-center justify-center dark:bg-white dark:text-black"
        aria-label="Open Digital Twin Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-3rem)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <h3 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Digital Twin (WebGPU)
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {progressText && (
          <div className="text-xs text-center text-zinc-500 dark:text-zinc-400 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            {progressText}
          </div>
        )}
        
        {messages.filter(m => m.role !== 'system').map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-palette-primary text-white dark:bg-white dark:text-black rounded-tr-sm'
                  : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-tl-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!engine || isLoading}
            placeholder={!engine ? 'Initializing...' : 'Ask me anything...'}
            className="flex-1 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-palette-primary dark:focus:ring-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!engine || isLoading || !input.trim()}
            className="p-2 rounded-full bg-palette-primary text-white dark:bg-white dark:text-black disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
