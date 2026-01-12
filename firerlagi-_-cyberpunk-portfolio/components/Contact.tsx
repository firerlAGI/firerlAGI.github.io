import React from 'react';
import CyberCard from './CyberCard';
import GlitchText from './GlitchText';
import { Mail, MapPin, Twitter, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <GlitchText text="INITIATE UPLINK" as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4 block" />
          <p className="text-cyan-400 font-mono">Available for freelance contracts and classified missions.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <CyberCard glowColor="pink" className="flex flex-col justify-center gap-6">
                <h3 className="text-2xl font-cyber text-fuchsia-400 mb-2">TRANSMISSION CHANNELS</h3>
                
                <div className="space-y-4">
                    <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-fuchsia-400 transition-colors group">
                        <div className="p-3 border border-gray-700 group-hover:border-fuchsia-500 rounded bg-black/50">
                            <Mail size={20} />
                        </div>
                        <span className="font-mono">firerlagi@nexus.net</span>
                    </a>
                    
                    <a href="#" className="flex items-center gap-4 text-gray-300 hover:text-fuchsia-400 transition-colors group">
                        <div className="p-3 border border-gray-700 group-hover:border-fuchsia-500 rounded bg-black/50">
                            <MapPin size={20} />
                        </div>
                        <span className="font-mono">Silicon Valley, Sector 7</span>
                    </a>
                </div>

                <div className="flex gap-4 mt-4">
                    <a href="#" className="p-3 border border-gray-700 hover:border-fuchsia-500 text-gray-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10 transition-all">
                        <Twitter size={20} />
                    </a>
                    <a href="#" className="p-3 border border-gray-700 hover:border-fuchsia-500 text-gray-400 hover:text-fuchsia-400 hover:bg-fuchsia-500/10 transition-all">
                        <Linkedin size={20} />
                    </a>
                </div>
            </CyberCard>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                    <input type="text" placeholder="IDENTITY" className="w-full bg-black/50 border border-gray-700 p-4 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors peer" />
                    <div className="absolute inset-0 border border-transparent peer-focus:border-cyan-500/20 pointer-events-none blur-sm transition-all" />
                </div>
                <div className="relative group">
                    <input type="email" placeholder="FREQUENCY (EMAIL)" className="w-full bg-black/50 border border-gray-700 p-4 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors" />
                </div>
                <div className="relative group">
                    <textarea rows={4} placeholder="ENCRYPTED MESSAGE" className="w-full bg-black/50 border border-gray-700 p-4 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors" />
                </div>
                <button className="w-full py-4 bg-cyan-900/20 border border-cyan-500 text-cyan-400 font-cyber tracking-widest hover:bg-cyan-500 hover:text-black transition-all uppercase">
                    Send Transmission
                </button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;