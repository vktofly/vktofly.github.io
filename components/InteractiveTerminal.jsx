"use client";
import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import profile from '../data/profile';
import projects from '../data/projects';
import experience from '../data/experience';

const systemPrompt = `You are the AI clone of ${profile.name}.
Role: ${profile.role}
Headline: ${profile.headline}
Summary: ${profile.summary}

Your goal is to act as ${profile.name} and answer questions from recruiters or visitors about your background. 
Be professional, concise, slightly visionary, and highly relevant.
When asked about your experience, refer to these roles:
${experience.slice(0, 4).map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.summary}`).join('\n')}

When asked about projects, refer to these:
${projects.filter(p => p.featured).map(p => `- ${p.title}: ${p.description}`).join('\n')}

Keep your answers under 3-4 sentences. Format output in plain text suitable for a command-line interface. Use newlines for readability.
Do NOT use markdown like **bold** because this is a plain text terminal. You can use dashes for lists.`;

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Vikash_OS v2.0.0 (AI Edition)' },
    { type: 'output', text: 'I am Vikash\\'s AI clone. Ask me anything about my experience, projects, or skills.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize the Gemini client if API key exists
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const fallbackCommand = (cmd) => {
    switch (cmd) {
      case 'help':
        return `Available commands: about, skills, projects, contact, clear. (AI is disabled due to missing API key)`;
      case 'about':
        return `I am a Polymath, Futurist & Founder.\nMy work bridges the gap between deep technical systems and business strategy.`;
      case 'skills':
        return `[ Data & AI ]: Python, SQL, BigQuery, LangChain, OpenAI\n[ Dev & Sys ]: React, Next.js, Cloud Architecture`;
      case 'projects':
        return `1. NL-to-Chart Dashboard\n2. Real-Time "Reasoning" UI\n3. Self-Optimizing Agent Pipeline`;
      case 'contact':
        return `Email: ${profile.email}`;
      case 'clear':
        return 'CLEAR';
      case 'sudo':
      case 'sudo su':
        return `vikash@portfolio is not in the sudoers file. This incident will be reported.`;
      default:
        return `Command not found: ${cmd}. Type "help" for available commands.`;
    }
  };

  const handleCommand = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const cmd = input.trim();
    const newHistory = [...history, { type: 'input', text: cmd }];
    setHistory(newHistory);
    setInput('');

    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    if (!ai) {
      // Fallback if no API key
      const output = fallbackCommand(cmd.toLowerCase());
      if (output === 'CLEAR') return;
      setHistory([...newHistory, { type: 'output', text: output }]);
      return;
    }

    setIsLoading(true);

    try {
      // Construct conversation history for Gemini API
      // Filter out system welcome messages, map to correct format
      const apiContents = newHistory
        .filter(h => h.text !== 'Welcome to Vikash_OS v2.0.0 (AI Edition)' && h.text !== 'I am Vikash\\'s AI clone. Ask me anything about my experience, projects, or skills.')
        .map(h => ({
          role: h.type === 'input' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: apiContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      });

      setHistory([...newHistory, { type: 'output', text: response.text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setHistory([...newHistory, { type: 'error', text: `System Error: Unable to connect to AI core. Please try again later.\n${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50 bg-[#1e1e1e] font-mono text-sm sm:text-base">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-zinc-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <div className="w-3 h-3 rounded-full bg-green-500/90" />
        </div>
        <div className="mx-auto text-zinc-400 text-xs sm:text-sm font-medium">
          vikash@portfolio:~ {ai ? '(AI Enabled)' : '(AI Disabled - Add NEXT_PUBLIC_GEMINI_API_KEY)'}
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="p-4 sm:p-6 h-[350px] sm:h-[400px] overflow-y-auto text-zinc-300"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'input' ? (
              <div className="flex text-zinc-100">
                <span className="text-brand-400 mr-2">vikash@portfolio:~$</span>
                <span>{line.text}</span>
              </div>
            ) : line.type === 'error' ? (
              <div className="whitespace-pre-wrap text-red-400 leading-relaxed">
                {line.text}
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-zinc-400 leading-relaxed">
                {line.text}
              </div>
            )}
          </div>
        ))}
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex text-zinc-400 mb-2">
            <span className="animate-pulse">AI is thinking...</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleCommand} className="flex mt-2">
          <span className="text-brand-400 mr-2">vikash@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none border-none text-zinc-100 shadow-none ring-0 p-0 m-0 focus:ring-0 disabled:opacity-50"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
