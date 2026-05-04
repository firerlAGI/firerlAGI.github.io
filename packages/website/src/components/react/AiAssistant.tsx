import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu, Trash2 } from 'lucide-react';
import { getAiResponse } from '../../services/aiService';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const STORAGE_KEY = 'firerlagi_ai_chat_history';

const AiAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
        hasInitialized.current = true;
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
  }, []);

  // Save history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Set initial greeting only if no messages exist and we haven't initialized
    if (messages.length === 0 && !hasInitialized.current) {
         setMessages([{ role: 'ai', text: t.ai.greeting }]);
         hasInitialized.current = true;
    }
  }, [t.ai.greeting, messages.length]);

  const clearHistory = () => {
    setMessages([{ role: 'ai', text: t.ai.greeting }]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const reply = await getAiResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-center w-14 h-14 bg-[#2d2d2f]/90 border border-white/10 rounded-full shadow-lg hover:bg-[#3d3d3f] hover:scale-105 transition-all duration-300 backdrop-blur-md"
        >
          <Cpu className="text-white/80 group-hover:text-white transition-colors" size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 md:w-96 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]/95 backdrop-blur-xl shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-white/70" />
                <span className="font-medium text-white/90 text-sm tracking-wide">{t.ai.header}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearHistory} 
                  className="text-white/40 hover:text-white/80 transition-colors"
                  title="Clear History"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white/80 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 text-sm custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3 rounded-2xl leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-white/20 text-white rounded-br-sm' 
                      : 'bg-[#2d2d2f] text-white/90 rounded-bl-sm border border-white/5'
                    }
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="text-white/50 animate-pulse text-xs">{t.ai.processing}</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2 bg-[#1d1d1f]/50 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.ai.placeholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-full text-white/90 px-4 py-2.5 text-sm focus:border-white/30 focus:outline-none placeholder-white/30 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
