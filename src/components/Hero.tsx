import React from 'react';
import { ArrowRight, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenQRStudio: () => void;
  activeDishesCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenQRStudio, activeDishesCount }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-white/5">
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-medium text-cyan-200">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>CUSAC Web Designer · Menús de mesa en tiempo real</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Menús QR de mesa con control en tiempo real.
            </h1>

            <p className="text-lg text-zinc-300 max-w-xl font-normal leading-relaxed">
              Tus clientes escanean un soporte elegante en su mesa. Si un plato se agota o quieres actualizar un precio, lo modificas en tu portal y se actualiza al instante en todos los móviles sin reimprimir nada.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-white rounded-lg hover:bg-zinc-200 transition-all cursor-pointer shadow-lg shadow-white/5"
              >
                <span>Probar Demo Interactiva</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:633737652"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-zinc-900 border border-cyan-500/30 rounded-lg hover:bg-zinc-800 hover:border-cyan-500/60 transition-colors cursor-pointer font-mono"
              >
                <span>Llamar: 633 73 76 52</span>
              </a>
            </div>

            {/* Quick Proof highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">0 seg</p>
                <p className="text-xs text-zinc-300 mt-0.5">Sincronización en vivo</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">1.800€</p>
                <p className="text-xs text-zinc-300 mt-0.5">Ahorro anual en papel</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white tabular-nums">100%</p>
                <p className="text-xs text-zinc-300 mt-0.5">Alérgenos certificados</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group">
              <img
                src="/src/assets/images/hero_restaurant_qr_1793981797366.jpg"
                alt="Soporte QR minimalista en mesa de restaurante de lujo"
                className="w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Real-time floating overlay indicator */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white tracking-wide">Mesa 24 · Salón Principal</span>
                    <span className="text-[10px] px-1.5 py-0.2 text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded">
                      En directo
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-mono">
                    {activeDishesCount} platos disponibles · Carta digital activa
                  </p>
                </div>
                <button
                  onClick={onOpenDemo}
                  className="px-3 py-1.5 text-xs font-semibold text-black bg-white rounded hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
                >
                  Ver Menú
                </button>
              </div>
            </div>

            {/* Subtle decorative glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/10 to-transparent -z-10 blur-xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
};
