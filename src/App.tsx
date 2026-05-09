/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Search, 
  Tv, 
  ChevronRight,
  User,
  X,
  Plus,
  PlayIcon,
  Settings
} from 'lucide-react';
import { CHANNELS, CATEGORIES, Channel, CATEGORIES_CONFIG } from './channels.ts';

// --- Components ---

const CategoryPill = ({ category, count, color, isFocused }: { category: string, count: number, color: string, isFocused: boolean }) => (
  <motion.div
    animate={{ scale: isFocused ? 1.05 : 1 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${isFocused ? 'bg-white/10 border-white' : 'bg-black/40 border-white/10'}`}
  >
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-white font-bold text-sm">{category}</span>
    <span className="text-gray-500 text-xs font-bold">{count}</span>
  </motion.div>
);

const MediaCard = ({ item, isFocused, onClick }: { item: Channel, isFocused: boolean, onClick: () => void }) => (
  <div className="flex flex-col gap-3">
    <motion.div
      animate={{
        scale: isFocused ? 1.05 : 1,
        borderColor: isFocused ? '#ffffff' : 'transparent',
      }}
      onClick={onClick}
      style={{ backgroundColor: item.color }}
      className={`relative flex-shrink-0 w-80 h-44 rounded-xl cursor-pointer border-4 transition-all duration-300 flex items-center justify-center p-4 overflow-hidden ${isFocused ? 'shadow-2xl shadow-white/20' : 'opacity-90'}`}
    >
      <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black tracking-widest text-white uppercase italic">AO VIVO</div>
      <span className="text-white text-7xl font-black tracking-tighter opacity-90 drop-shadow-lg">{item.initials}</span>
    </motion.div>
    <div className="flex flex-col ml-1">
      <span className={`text-white font-bold text-base transition-opacity ${isFocused ? 'opacity-100' : 'opacity-80'}`}>{item.name}</span>
      <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">{item.category}</span>
    </div>
  </div>
);

export default function App() {
  const [focusedIndex, setFocusedIndex] = useState({ section: 'hero', row: 0, col: 0 }); // section: 'hero', 'categories', 'content'
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDnsInfo, setShowDnsInfo] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(CHANNELS[0]);

  const getChannelsByCategory = useCallback((category: string) => {
    return CHANNELS.filter(ch => ch.category === category);
  }, []);

  const totalCanais = CHANNELS.length;

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlaying) {
        if (e.key === 'Escape' || e.key === 'Backspace') setIsPlaying(false);
        return;
      }

      if (showDnsInfo) {
        if (e.key === 'Escape' || e.key === 'Backspace') setShowDnsInfo(false);
        return;
      }

      const { section, row, col } = focusedIndex;

      switch (e.key) {
        case 'ArrowRight':
          if (section === 'categories' && col < CATEGORIES_CONFIG.length - 1) setFocusedIndex({ ...focusedIndex, col: col + 1 });
          else if (section === 'hero' && col < 2) setFocusedIndex({ ...focusedIndex, col: col + 1 });
          else if (section === 'content') {
            const cat = row === 0 ? "Em destaque" : CATEGORIES[row - 1];
            const channels = cat === "Em destaque" ? CHANNELS.slice(0, 10) : getChannelsByCategory(cat);
            if (col < channels.length - 1) setFocusedIndex({ ...focusedIndex, col: col + 1 });
          }
          break;
        case 'ArrowLeft':
          if (col > 0) setFocusedIndex({ ...focusedIndex, col: col - 1 });
          break;
        case 'ArrowDown':
          if (section === 'hero') setFocusedIndex({ section: 'categories', row: 0, col: 0 });
          else if (section === 'categories') setFocusedIndex({ section: 'content', row: 0, col: 0 });
          else if (section === 'content' && row < CATEGORIES.length) setFocusedIndex({ ...focusedIndex, row: row + 1, col: 0 });
          break;
        case 'ArrowUp':
          if (section === 'content') {
            if (row > 0) setFocusedIndex({ ...focusedIndex, row: row - 1, col: 0 });
            else setFocusedIndex({ section: 'categories', row: 0, col: 0 });
          }
          else if (section === 'categories') setFocusedIndex({ section: 'hero', row: 0, col: 0 });
          break;
        case 'Enter':
          if (section === 'hero') {
            if (col === 0) setIsPlaying(true);
            if (col === 2) setShowDnsInfo(true);
          }
          else if (section === 'content') setIsPlaying(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, isPlaying, showDnsInfo, getChannelsByCategory]);

  // Update selected channel based on content focus
  useEffect(() => {
    if (focusedIndex.section === 'content') {
      const cat = focusedIndex.row === 0 ? "Em destaque" : CATEGORIES[focusedIndex.row - 1];
      const channels = cat === "Em destaque" ? CHANNELS.slice(0, 10) : getChannelsByCategory(cat);
      if (channels[focusedIndex.col]) {
        setSelectedChannel(channels[focusedIndex.col]);
      }
    }
  }, [focusedIndex, getChannelsByCategory]);

  const rowList = ["Em destaque", ...CATEGORIES];

  return (
    <div className="flex flex-col h-screen bg-[#060606] text-white font-sans overflow-hidden">
      {/* Background Hero Overlay */}
      <div className="absolute inset-x-0 top-0 h-[80vh] pointer-events-none z-0 overflow-hidden">
        <motion.div 
          key={selectedChannel?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 30%, ${selectedChannel?.color}40 0%, transparent 60%), linear-gradient(to bottom, transparent 0%, #060606 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-16 py-10">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-white/90">TV Aberta BR</h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">{totalCanais} canais ao vivo</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <button 
              onClick={() => setShowDnsInfo(true)}
              className="flex items-center gap-1.5 text-green-500/80 text-[10px] font-black uppercase tracking-widest hover:text-green-400 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              DNS AdGuard Ativo
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/5 hover:bg-white/10 transition-all">
            <Search size={22} className="text-gray-400" />
          </button>
          <button 
            onClick={() => setShowDnsInfo(true)}
            className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/5 hover:bg-white/10 transition-all"
          >
            <Settings size={22} className="text-gray-400" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
            <User size={22} className="text-gray-500" />
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 overflow-y-scroll no-scrollbar px-16 pb-32">
        {/* News Hero Banner */}
        <section className="mb-20 mt-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2.5 mb-8 bg-red-600/10 border border-red-600/20 w-fit px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Em alta agora</span>
            </div>
            <h2 className="text-6xl font-black mb-6 tracking-tighter leading-[0.9] italic uppercase max-w-xl">
              Assista TV ao vivo, grátis.
            </h2>
            <p className="text-gray-400 text-xl font-bold mb-12 max-w-2xl leading-relaxed opacity-80">
              Globo, SBT, ESPN, HBO, Premiere e muito mais &mdash; direto na sua TV.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                className={`flex items-center gap-3 px-10 py-4.5 rounded-lg font-black text-lg uppercase tracking-tight transition-all ${focusedIndex.section === 'hero' && focusedIndex.col === 0 ? 'bg-red-600 text-white scale-105 shadow-2xl shadow-red-600/40' : 'bg-red-600 text-white'}`}
              >
                <PlayIcon fill="currentColor" size={24} /> Assistir agora
              </button>
              <button className={`flex items-center gap-3 px-10 py-4.5 rounded-lg font-black text-lg uppercase tracking-tight transition-all border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 ${focusedIndex.section === 'hero' && focusedIndex.col === 1 ? 'border-white bg-white/20' : ''}`}>
                <Search size={24} className="text-gray-300" /> Buscar canal
              </button>
              <button 
                onClick={() => setShowDnsInfo(true)}
                className={`flex items-center justify-center w-16 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all ${focusedIndex.section === 'hero' && focusedIndex.col === 2 ? 'border-white bg-white/20 scale-105' : ''}`}
              >
                <Settings size={28} className="text-gray-400" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Categories Pills */}
        <section className="mb-24">
          <h3 className="text-lg font-black uppercase tracking-widest mb-8 opacity-50 italic">Categorias</h3>
          <div className="flex gap-4 overflow-x-hidden py-2">
            {CATEGORIES_CONFIG.map((cat, idx) => (
              <CategoryPill 
                key={cat.name} 
                category={cat.name} 
                count={CHANNELS.filter(ch => ch.category === cat.name).length}
                color={cat.color}
                isFocused={focusedIndex.section === 'categories' && focusedIndex.col === idx}
              />
            ))}
          </div>
        </section>

        {/* Rows */}
        <div className="flex flex-col gap-24">
          {rowList.map((catName, rIndex) => {
            const channels = catName === "Em destaque" ? CHANNELS.slice(0, 10) : CHANNELS.filter(c => c.category === catName);
            if (channels.length === 0) return null;

            return (
              <div key={catName} className="flex flex-col gap-8">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic opacity-90">{catName}</h3>
                  <button className="text-white/40 font-black text-[11px] uppercase tracking-widest flex items-center gap-1.5 hover:text-red-500 transition-colors">
                    Ver todos <ChevronRight size={14} className="text-red-600" />
                  </button>
                </div>
                <div 
                  className="flex gap-8 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)]"
                  style={{ transform: `translateX(-${focusedIndex.section === 'content' && focusedIndex.row === rIndex && focusedIndex.col > 3 ? (focusedIndex.col - 3) * 352 : 0}px)` }}
                >
                  {channels.map((ch, cIndex) => (
                    <MediaCard 
                      key={ch.id} 
                      item={ch} 
                      onClick={() => {
                        setSelectedChannel(ch);
                        setIsPlaying(true);
                      }}
                      isFocused={focusedIndex.section === 'content' && focusedIndex.row === rIndex && focusedIndex.col === cIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Fullscreen Player */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="absolute top-10 left-10 z-50">
              <button 
                onClick={() => setIsPlaying(false)}
                className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <X size={28} />
              </button>
            </div>
            <iframe 
              src={selectedChannel.url} 
              className="w-full h-full border-none"
              allowFullScreen
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AdGuard DNS Info Modal */}
      <AnimatePresence>
        {showDnsInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#111111] border border-white/10 rounded-3xl p-12 max-w-2xl w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col">
                  <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white/90">Configuração de Rede</h2>
                  <p className="text-gray-500 font-bold mt-2">Otimize sua experiência com AdGuard DNS</p>
                </div>
                <button 
                  onClick={() => setShowDnsInfo(false)}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                    <span className="text-xs font-black uppercase tracking-widest text-green-500">Recomendado</span>
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase italic">Bloqueador de Anúncios</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Configure os endereços abaixo no seu roteador ou Smart TV para remover anúncios de vídeo e trackers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-5 rounded-xl border border-white/5">
                      <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">DNS Primário</span>
                      <code className="text-2xl font-mono font-bold text-red-500">94.140.14.14</code>
                    </div>
                    <div className="bg-black/50 p-5 rounded-xl border border-white/5">
                      <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">DNS Secundário</span>
                      <code className="text-2xl font-mono font-bold text-red-500">94.140.15.15</code>
                    </div>
                    <div className="bg-black/50 p-5 rounded-xl border border-white/5 md:col-span-2">
                      <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest block mb-2">Private DNS / Hostname</span>
                      <code className="text-2xl font-mono font-bold text-green-500">dns.adguard-dns.com</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                  <p className="text-sm font-medium text-blue-400 leading-relaxed">
                    <strong>Dica:</strong> Em Smart TVs, vá em Configurações &gt; Rede &gt; Status &gt; Config. IP e altere a configuração de DNS para manual.
                  </p>
                </div>

                <button 
                  onClick={() => setShowDnsInfo(false)}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

