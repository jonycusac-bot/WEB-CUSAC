import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface ContactSectionProps {
  preselectedPlan?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedPlan }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tableCount, setTableCount] = useState('20-40 mesas');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !restaurantName) return;

    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#07080b] border-b border-white/5" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
              Asesoramiento & Muestra Gratuita
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Lleva tu restaurante al siguiente nivel digital.
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Solicita una demostración guiada o pídenos una muestra física real de soporte de metacrilato negro para que la pruebes en tus mesas sin compromiso.
            </p>

            <div className="pt-4 space-y-4 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300">Atención telefónica & WhatsApp</p>
                  <a
                    href="tel:633737652"
                    className="text-white hover:text-cyan-300 font-bold font-mono text-sm transition-colors block"
                  >
                    633 73 76 52
                  </a>
                  <a
                    href="https://wa.me/34633737652?text=Hola,%20quisiera%20información%20sobre%20los%20menús%20QR%20en%20mesa"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-400 hover:underline"
                  >
                    Abrir WhatsApp directo
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300">Email directo</p>
                  <a
                    href="mailto:jonycusac@gmail.com"
                    className="text-white hover:text-cyan-300 font-medium text-xs transition-colors"
                  >
                    jonycusac@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300">Estudio de Diseño Web</p>
                  <p className="text-white font-medium text-xs">CUSAC Web Designer · España</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-zinc-300 space-y-1">
              <p className="font-semibold text-white">¿Qué incluye la muestra gratuita?</p>
              <p className="text-[11px] text-zinc-300">
                1 soporte de mesa en metacrilato negro mate grabado con tu logotipo y código QR funcional configurado con 5 platos de tu carta actual.
              </p>
            </div>
          </div>

          {/* Right: Clean Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">¡Solicitud recibida correctamente!</h3>
                  <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Hemos preparado el acceso demo para <strong className="text-white">{restaurantName}</strong>. Uno de nuestros consultores de sala te contactará en <strong className="text-white">{email}</strong> en menos de 2 horas laborables.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">Solicitar Información o Muestra de Mesa</h3>
                    {preselectedPlan && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                        {preselectedPlan}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Nombre del Restaurante / Local *</label>
                      <input
                        type="text"
                        required
                        placeholder="ej. Restaurante El Asador"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Persona de Contacto *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nombre y cargo (ej. Jefe de Sala)"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Email Profesional *</label>
                      <input
                        type="email"
                        required
                        placeholder="propietario@restaurante.es"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Teléfono Móvil *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+34 600 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Número de Mesas Estimadas</label>
                    <select
                      value={tableCount}
                      onChange={(e) => setTableCount(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="Menos de 15 mesas">Menos de 15 mesas (Local pequeño / Bar)</option>
                      <option value="15-35 mesas">15 a 35 mesas (Restaurante estándar)</option>
                      <option value="35-70 mesas">35 a 70 mesas (Restaurante grande / Terraza amplia)</option>
                      <option value="Más de 70 mesas">Más de 70 mesas o Varios locales (Cadena / Hotel)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">¿Alguna necesidad específica? (Opcional)</label>
                    <textarea
                      rows={3}
                      placeholder="Dinos si necesitas carta de vinos extensa, varios idiomas, o soporte especial..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Solicitar Demostración & Muestra Gratis</span>
                    </button>
                    <p className="text-[10px] text-zinc-300 text-center mt-2">
                      Sin permanencia ni coste inicial. Te respondemos el mismo día.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
