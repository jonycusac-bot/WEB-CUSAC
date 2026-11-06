import React from 'react';
import { QrCode } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'landing' | 'demo' | 'admin' | 'guest' | 'qr-studio' | 'pricing' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050608] border-t border-white/10 py-12 text-zinc-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-auto rounded border border-cyan-500/30 overflow-hidden bg-black/60">
                <img
                  src="/assets/aistudio/image_69c955e5_caa644a4.jpg"
                  alt="CUSAC Logo"
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm tracking-tight leading-none">CUSAC</span>
                <span className="text-[10px] text-cyan-400 font-mono">Web Designer</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-300">
              Soluciones integrales de cartas QR dinámicas en tiempo real y soportes físicos premium para el sector gastronómico.
            </p>
            <div className="pt-1">
              <a
                href="tel:633737652"
                className="inline-flex items-center gap-1.5 text-xs text-white hover:text-cyan-300 font-mono font-semibold"
              >
                <span>Tel: 633 73 76 52</span>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-2">
            <p className="font-semibold text-white text-xs">Plataforma</p>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => onNavigate('demo')} className="hover:text-white transition-colors cursor-pointer">
                  Simulador en Vivo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors cursor-pointer">
                  Portal de Administración
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qr-studio')} className="hover:text-white transition-colors cursor-pointer">
                  Estudio de Soportes QR
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Calculadora de Retorno (ROI)
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-2">
            <p className="font-semibold text-white text-xs">Sectores</p>
            <ul className="space-y-1.5 text-[11px] text-zinc-300">
              <li>Restaurantes & Asadores</li>
              <li>Gastrobares & Coctelerías</li>
              <li>Hoteles & Room Service</li>
              <li>Terrazas & Chiringuitos</li>
            </ul>
          </div>

          {/* Legal & Regulatory */}
          <div className="space-y-2">
            <p className="font-semibold text-white text-xs">Normativa & Seguridad</p>
            <ul className="space-y-1.5 text-[11px] text-zinc-300">
              <li>Reglamento Europeo 1169/2011 (Alérgenos)</li>
              <li>Disponibilidad 99.9% en alta demanda</li>
              <li>Alojamiento Seguro de Datos (RGPD)</li>
              <li>Soportes Lavables con Norma Alimentaria</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-300">
          <p>© {new Date().getFullYear()} CUSAC Web Designer. Tel: 633 73 76 52. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <a href="#contacto" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#contacto" className="hover:text-white transition-colors">Términos del Servicio</a>
            <a href="#contacto" className="hover:text-white transition-colors">Aviso Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
