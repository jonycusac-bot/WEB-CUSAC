import React from 'react';
import { Smartphone, LayoutDashboard, QrCode, Calculator, Mail, Phone, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'demo' | 'admin' | 'guest' | 'qr-studio' | 'pricing' | 'contact';
  setActiveTab: (tab: 'landing' | 'demo' | 'admin' | 'guest' | 'qr-studio' | 'pricing' | 'contact') => void;
  onOpenLiveDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenLiveDemo }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#07080b]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark / Logo */}
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
        >
          <div className="h-9 w-auto overflow-hidden rounded-md border border-cyan-500/20 shadow-sm shadow-cyan-500/10 bg-black/50">
            <img
              src="/assets/aistudio/image_69c955e5_caa644a4.jpg"
              alt="CUSAC Web Designer Logo"
              className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap leading-none">
              CUSAC
            </span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase leading-tight">
              Web Designer
            </span>
          </div>
        </button>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab('landing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'landing' ? 'text-white' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={onOpenLiveDemo}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'demo' ? 'text-white' : ''
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Demo en Vivo</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'admin' ? 'text-white' : ''
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Portal Propietario</span>
          </button>
          <button
            onClick={() => setActiveTab('qr-studio')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'qr-studio' ? 'text-white' : ''
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Soportes QR</span>
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'pricing' ? 'text-white' : ''
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Ahorro & Precios</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5 ${
              activeTab === 'contact' ? 'text-white' : ''
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto</span>
          </button>
        </nav>

        {/* Zone 3: Direct Phone 633 73 76 52 + Download ZIP + Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/cusac_web_designer.zip"
            download="cusac_web_designer.zip"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-cyan-200 hover:bg-cyan-900/40 text-xs font-medium transition-colors"
            title="Descargar copia del proyecto para tu carpeta en escritorio"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Descargar ZIP</span>
          </a>

          <a
            href="tel:633737652"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
            title="Llamar directamente a CUSAC"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>633 73 76 52</span>
          </a>

          <button
            onClick={onOpenLiveDemo}
            className="px-3.5 py-1.5 text-xs font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            Demo
          </button>
        </div>
      </div>
    </header>
  );
};
