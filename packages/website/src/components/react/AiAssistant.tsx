import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu } from 'lucide-react';
import { getGeminiResponse } from '../../services/geminiService';
import CyberCard from '../ui/CyberCard.astro';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AiAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Set initial greeting only once or when language changes if empty
    if (messages.length === 0 || !hasInitialized.current) {
         setMessages([{ role: 'ai', text: t.ai.greeting }]);
         hasInitialized.current = true;
    }
  }, [t.ai.greeting]);

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

    const reply = await getGeminiResponse(userMsg);
    
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
          className="group relative flex items-center justify-center w-16 h-16 bg-black border border-cyan-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-cyan-800/40 transition-colors" />
          <Cpu className="text-cyan-400 group-hover:animate-spin" size={32} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 md:w-96 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <CyberCard className="p-0 border-cyan-500/80 bg-black/95" glowColor="cyan">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-cyan-500/30 bg-cyan-950/20">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" />
                <span className="font-cyber text-cyan-400 text-sm">{t.ai.header}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 font-mono text-xs custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3 border 
                    ${msg.role === 'user' 
                      ? 'border-fuchsia-500/50 bg-fuchsia-900/10 text-fuchsia-100 rounded-tl-lg rounded-br-lg' 
                      : 'border-cyan-500/50 bg-cyan-900/10 text-cyan-100 rounded-tr-lg rounded-bl-lg'
                    }
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="text-cyan-500 animate-pulse text-xs">{t.ai.processing}</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-cyan-500/30 flex gap-2 bg-black">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.ai.placeholder}
                className="flex-1 bg-transparent border border-gray-700 text-gray-300 px-3 py-2 text-xs font-mono focus:border-cyan-500 focus:outline-none placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyan-900/30 border border-cyan-500/50 text-cyan-400 p-2 hover:bg-cyan-500 hover:text-black transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </CyberCard>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
