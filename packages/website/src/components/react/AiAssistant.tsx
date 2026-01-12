import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'GREETINGS. I AM FIRERLAGI_BOT v2.0. HOW CAN I ASSIST?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'ai', text: 'API KEY NOT CONFIGURED. PLEASE SET GEMINI_API_KEY.' }]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMsg
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'ERROR PROCESSING REQUEST.';
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'CONNECTION ERROR. PLEASE TRY AGAIN.' }]);
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
          <div className="relative overflow-hidden bg-cyber-panel/80 backdrop-blur-sm border border-cyan-500/80 bg-black/95 p-0 transition-all duration-300">
            <div className="flex justify-between items-center p-4 border-b border-cyan-500/30 bg-cyan-950/20">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" />
                <span className="font-cyber text-cyan-400 text-sm">AI TERMINAL</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

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
                  <div className="text-cyan-500 animate-pulse text-xs">PROCESSING DATA STREAM...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-cyan-500/30 flex gap-2 bg-black">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command..."
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
