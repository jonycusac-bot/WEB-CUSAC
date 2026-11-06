import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onSelectPlan }) => {
  const [tables, setTables] = useState<number>(25);
  const [menuUpdatesPerYear, setMenuUpdatesPerYear] = useState<number>(4);
  const [printCostPerBatch, setPrintCostPerBatch] = useState<number>(420);

  // Math
  const annualPrintCost = menuUpdatesPerYear * printCostPerBatch;
  const cusacCostAnnual = 39 * 12; // e.g. 468€ / year
  const netSavings = Math.max(0, annualPrintCost - cusacCostAnnual);
  const paperKgSaved = Math.round(tables * menuUpdatesPerYear * 1.8);

  const plans = [
    {
      name: 'Plan Esencial',
      badge: null,
      price: '29',
      billing: '€ / mes',
      description: 'Ideal para cafeterías, cervecerías y gastrobares que buscan digitalizar su carta.',
      features: [
        'Carta digital en tiempo real ilimitada',
        'Portal de administración móvil para el dueño',
        'Ocultar platos agotados al segundo',
        'Filtro de alérgenos obligatorio por ley',
        'Generador de QR digitales en alta resolución',
        'Soporte por email en 24h',
      ],
      cta: 'Elegir Plan Esencial',
      featured: false,
    },
    {
      name: 'Hostelería Pro',
      badge: 'Más Popular',
      price: '49',
      billing: '€ / mes',
      description: 'Para restaurantes y asadores que desean la experiencia completa y soportes físicos incluidos.',
      features: [
        'Todo lo del Plan Esencial',
        'Incluye pack de 25 soportes de metacrilato negro mate',
        'Petición de llamada a camarero y cuenta desde mesa',
        'Sincronización multi-sala (Salón, Terraza, Barra)',
        'Métricas de platos más vistos y horas punta',
        'Configuración inicial de carta por nuestro equipo',
        'Soporte telefónico prioritario',
      ],
      cta: 'Elegir Hostelería Pro',
      featured: true,
    },
    {
      name: 'Luxury Gastronomía',
      badge: 'Máxima Distinción',
      price: '89',
      billing: '€ / mes',
      description: 'Para alta cocina, hoteles boutique y cadenas que exigen diseño a medida.',
      features: [
        'Todo lo del Plan Hostelería Pro',
        'Soportes artesanales en madera de nogal o titanio grabados con láser',
        'Integración directa con tu sistema TPV / POS',
        'Multi-idioma con traducción gastronómica profesional',
        'Fotografía profesional de platos (según ubicación)',
        'Asesor dedicado 24/7 para cambios urgentes de carta',
      ],
      cta: 'Solicitar Propuesta Luxury',
      featured: false,
    },
  ];

  return (
    <section className="py-20 border-b border-white/5 bg-[#07080b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
            Inversión Transparente & Retorno Real
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calcula cuánto ahorra tu restaurante al año.
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Las reimpresiones por cambio de precios, platos fuera de carta o cartas deterioradas cuestan miles de euros al año. Comprueba tu ahorro directo.
          </p>
        </div>

        {/* Interactive Savings Calculator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-white" />
              <span>Calculadora de Ahorro en Imprenta</span>
            </h3>

            {/* Tables slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Número de mesas en el local:</span>
                <span className="font-mono font-bold text-white tabular-nums">{tables} mesas</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={tables}
                onChange={(e) => setTables(parseInt(e.target.value))}
                className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Updates per year */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Cambios de carta o precios al año:</span>
                <span className="font-mono font-bold text-white tabular-nums">{menuUpdatesPerYear} ediciones</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={menuUpdatesPerYear}
                onChange={(e) => setMenuUpdatesPerYear(parseInt(e.target.value))}
                className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Cost per print batch */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-300">Coste medio por tirada de imprenta:</span>
                <span className="font-mono font-bold text-white tabular-nums">{printCostPerBatch} € / tirada</span>
              </div>
              <input
                type="range"
                min="150"
                max="1200"
                step="30"
                value={printCostPerBatch}
                onChange={(e) => setPrintCostPerBatch(parseInt(e.target.value))}
                className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-4 text-center sm:text-left">
            <span className="text-[11px] text-zinc-300 font-mono uppercase tracking-wider block">
              Resultado Financiero Estimado
            </span>

            <div className="space-y-1">
              <p className="text-4xl font-extrabold font-mono text-white tabular-nums">
                {netSavings.toLocaleString('es-ES')} €
              </p>
              <p className="text-xs text-emerald-400 font-medium">
                Ahorro neto anual en papel y maquetación
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Gasto actual en imprenta:</span>
                <span className="font-mono text-zinc-300">{annualPrintCost.toLocaleString('es-ES')} € / año</span>
              </div>
              <div className="flex justify-between">
                <span>Inversión con CUSAC:</span>
                <span className="font-mono text-zinc-300">{cusacCostAnnual} € / año</span>
              </div>
              <div className="flex justify-between">
                <span>Papel ahorrado:</span>
                <span className="font-mono text-emerald-400 font-semibold">~{paperKgSaved} kg de papel</span>
              </div>
            </div>
          </div>

        </div>

        {/* Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                plan.featured
                  ? 'bg-zinc-950 border-2 border-white/30 shadow-2xl shadow-white/5'
                  : 'bg-zinc-950/60 border border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-white text-black font-bold text-[10px] tracking-wide uppercase shadow">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-white tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-xs text-zinc-300 font-medium">
                    {plan.billing}
                  </span>
                </div>

                <ul className="space-y-3 pt-2 text-xs text-zinc-300 border-t border-white/10">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    plan.featured
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-zinc-900 border border-white/15 text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
