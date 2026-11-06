import React from 'react';
import { Zap, Smartphone, ShieldCheck, BarChart3, Palette, CheckCircle } from 'lucide-react';

export const Features: React.FC = () => {
  const capabilities = [
    {
      index: '01',
      title: 'Sincronización en vivo sin recargar',
      description: 'Si un pescado del día se agota a las 22:00 en mitad del servicio, lo ocultas con un solo tap en tu móvil y ningún comensal volverá a pedirlo por error.',
      outcome: 'Cero decepciones en mesa y cero fricción para los camareros.',
    },
    {
      index: '02',
      title: 'Portal de administración pensado para el hostelero',
      description: 'Cambia precios de temporada, sube nuevos cócteles de autor, añade recomendaciones del chef y modifica la carta completa en menos de 30 segundos.',
      outcome: 'Autonomía total desde tu smartphone sin depender de programadores.',
    },
    {
      index: '03',
      title: 'Soportes de mesa de diseño artesanal',
      description: 'Olvídate de pegatinas arrugadas o folios plastificados. Entregamos soportes de metacrilato negro mate, nogal natural o aluminio resistentes al agua y al desgaste.',
      outcome: 'Eleva la presencia de marca y el lujo percibido en cada mesa.',
    },
    {
      index: '04',
      title: 'Filtro de alérgenos y cumplimiento de ley',
      description: 'El comensal puede filtrar toda la carta al instante según sus intolerancias (gluten, lácteos, marisco, etc.), garantizando seguridad alimentaria y cumpliendo la normativa europea 1169/2011.',
      outcome: 'Confianza inmediata para grupos y clientes con restricciones.',
    },
    {
      index: '05',
      title: 'Servicio de mesa interactivo',
      description: 'Aviso directo de llamada al camarero y petición de cuenta (efectivo o tarjeta) directamente desde el móvil del cliente para agilizar la rotación de mesas.',
      outcome: 'Incrementa la rotación de mesas un 14% en horas punta.',
    },
    {
      index: '06',
      title: 'Ahorro económico directo y medible',
      description: 'Elimina para siempre los presupuestos periódicos de diseño gráfico, maquetación e imprenta cada vez que varias el menú o la carta de vinos.',
      outcome: 'Retorno de inversión garantizado desde el primer mes de uso.',
    },
  ];

  return (
    <section className="py-20 border-b border-white/5 bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-16">
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
            Ventajas Tecnológicas & Operativas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Construido para resolver los dolores reales de la hostelería.
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Una carta estática en papel o un PDF pesado descargable espanta a los clientes. CUSAC Web Designer combina la velocidad de una aplicación web ultrarrápida con un panel de control inmediato.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.index}
              className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {cap.index}.
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-zinc-100 transition-colors">
                  {cap.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                <span className="text-[11px] text-zinc-300 leading-snug">
                  {cap.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
