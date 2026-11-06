import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { RestaurantData } from '../types/restaurant';
import { 
  QrCode, 
  Download, 
  Printer, 
  Layers, 
  Sparkles, 
  Wifi, 
  Check, 
  Share2, 
  Palette,
  Eye
} from 'lucide-react';

interface QRStudioProps {
  restaurant: RestaurantData;
  onOpenCustomerView: (table: string) => void;
}

type StandTheme = 'acrylic-dark' | 'walnut-wood' | 'brushed-titanium' | 'minimal-white';

export const QRStudio: React.FC<QRStudioProps> = ({ restaurant, onOpenCustomerView }) => {
  const [selectedTable, setSelectedTable] = useState('04');
  const [tableArea, setTableArea] = useState('Salón Principal');
  const [theme, setTheme] = useState<StandTheme>('acrylic-dark');
  const [includeWifi, setIncludeWifi] = useState(true);
  const [customTagline, setCustomTagline] = useState('Escanea para ver la carta y alérgenos');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Target menu URL (uses current location with search param)
  const menuUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?mesa=${selectedTable}`
    : `https://cusac.es/menu?mesa=${selectedTable}`;

  useEffect(() => {
    // Generate real QR Code data URL
    const qrOptions: QRCode.QRCodeToDataURLOptions = {
      width: 400,
      margin: 1,
      color: {
        dark: theme === 'minimal-white' ? '#090a0f' : '#ffffff',
        light: '#00000000', // transparent background
      },
      errorCorrectionLevel: 'H',
    };

    QRCode.toDataURL(menuUrl, qrOptions)
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR:', err);
      });
  }, [menuUrl, theme]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(menuUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Mesa-${selectedTable}-${restaurant.name.replace(/\s+/g, '_')}.png`;
    a.click();
  };

  const handlePrintStand = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-white" />
          <h2 className="text-xl font-bold text-white tracking-tight">
            Estudio de Diseño de Soportes QR para Mesas
          </h2>
        </div>
        <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
          Diseña y genera soportes físicos de mesa profesionales en metacrilato negro mate, madera de nogal o aluminio cepillado. Cada código QR es único por mesa y enlaza directamente a la carta en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Configuration Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-5">
            <h3 className="text-sm font-semibold text-white">Configuración del Soporte</h3>

            {/* Table Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Número de Mesa
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['01', '02', '03', '04', '05', '06', '07', '08', 'T-1', 'T-2', 'VIP', 'Barra'].map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setSelectedTable(tbl)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                      selectedTable === tbl
                        ? 'bg-white text-black border-white'
                        : 'bg-black/40 text-zinc-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    Mesa {tbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Area or Zone */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Zona / Ubicación
              </label>
              <input
                type="text"
                value={tableArea}
                onChange={(e) => setTableArea(e.target.value)}
                placeholder="ej. Salón Principal, Terraza Exterior, Reservado"
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Material & Finish */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Material & Estilo del Soporte
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setTheme('acrylic-dark')}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    theme === 'acrylic-dark'
                      ? 'bg-white/10 border-white text-white font-semibold'
                      : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">Metacrilato Negro</p>
                  <p className="text-[10px] text-zinc-300 mt-0.5">Mate premium con láser plateado</p>
                </button>

                <button
                  onClick={() => setTheme('walnut-wood')}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    theme === 'walnut-wood'
                      ? 'bg-amber-950/40 border-amber-500/60 text-white font-semibold'
                      : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">Madera Nogal</p>
                  <p className="text-[10px] text-zinc-300 mt-0.5">Ecológico rústico elegante</p>
                </button>

                <button
                  onClick={() => setTheme('brushed-titanium')}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    theme === 'brushed-titanium'
                      ? 'bg-zinc-800/80 border-zinc-400 text-white font-semibold'
                      : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">Titanio Cepillado</p>
                  <p className="text-[10px] text-zinc-300 mt-0.5">Aluminio anodizado industrial</p>
                </button>

                <button
                  onClick={() => setTheme('minimal-white')}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    theme === 'minimal-white'
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold">Monocromo Claro</p>
                  <p className="text-[10px] opacity-80 mt-0.5">Tarjeta nítida de alta visibilidad</p>
                </button>
              </div>
            </div>

            {/* Custom Tagline */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Llamada a la Acción
              </label>
              <input
                type="text"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Include Wi-Fi Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-white flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Incluir clave Wi-Fi en soporte</span>
                </span>
                <p className="text-[10px] text-zinc-300">
                  {restaurant.wifiName}
                </p>
              </div>
              <input
                type="checkbox"
                checked={includeWifi}
                onChange={(e) => setIncludeWifi(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-700 text-white focus:ring-0 cursor-pointer"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadQR}
                  className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar QR PNG</span>
                </button>
                <button
                  onClick={handlePrintStand}
                  className="py-2.5 px-3 rounded-lg text-xs font-semibold bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Soporte</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-medium border border-white/10 bg-black/40 hover:bg-white/5 text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Enlace copiado!' : 'Copiar URL del Menú'}</span>
                </button>
                <button
                  onClick={() => onOpenCustomerView(selectedTable)}
                  className="py-2 px-3 rounded-lg text-xs font-medium border border-white/10 bg-black/40 hover:bg-white/5 text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver en Vivo</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Realistic Stand Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-300 px-1">
              <span>Vista previa del soporte físico (Escala 1:1)</span>
              <span className="font-mono">Dimensiones: 10 × 15 cm</span>
            </div>

            {/* Stand 3D/Physical Mockup */}
            <div className="relative p-6 pt-10 pb-12 flex justify-center bg-[#050608] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Table Surface illusion under the stand */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 w-3/4 h-3 bg-black/80 blur-md rounded-full" />

              {/* Physical Stand Card */}
              <div 
                className={`relative w-72 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 border ${
                  theme === 'acrylic-dark'
                    ? 'bg-[#0c0d12] border-white/20 text-white'
                    : theme === 'walnut-wood'
                    ? 'bg-[#1c120c] border-[#4a2e1b] text-amber-100'
                    : theme === 'brushed-titanium'
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                    : 'bg-white border-zinc-300 text-black'
                }`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />

                {/* Restaurant Header */}
                <div className="space-y-1 mb-4 z-10">
                  <span className="text-[10px] tracking-widest uppercase font-mono opacity-60">
                    MENÚ DIGITAL EN MESA
                  </span>
                  <h4 className="text-base font-extrabold tracking-tight">
                    {restaurant.name}
                  </h4>
                  <p className="text-[10px] opacity-75 font-mono">
                    {tableArea} · Mesa {selectedTable}
                  </p>
                </div>

                {/* Real Scannable QR Code Canvas / Image */}
                <div 
                  className={`p-3 rounded-xl border z-10 shadow-inner my-2 ${
                    theme === 'minimal-white'
                      ? 'bg-zinc-50 border-zinc-200'
                      : 'bg-black/60 border-white/20'
                  }`}
                >
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Mesa ${selectedTable}`}
                      className="w-40 h-40 object-contain"
                    />
                  ) : (
                    <div className="w-40 h-40 flex items-center justify-center">
                      <QrCode className="w-10 h-10 animate-pulse opacity-50" />
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <div className="mt-3 space-y-2 z-10">
                  <p className="text-xs font-medium max-w-[200px] leading-snug">
                    {customTagline}
                  </p>

                  {includeWifi && restaurant.wifiName && (
                    <div className={`mt-3 pt-2.5 border-t text-[10px] font-mono flex items-center justify-center gap-1.5 ${
                      theme === 'minimal-white' ? 'border-zinc-200 text-zinc-600' : 'border-white/10 text-zinc-300'
                    }`}>
                      <Wifi className="w-3 h-3" />
                      <span>Wi-Fi: <strong className="font-semibold">{restaurant.wifiName}</strong> / Clave: <strong className="font-semibold">{restaurant.wifiPass}</strong></span>
                    </div>
                  )}

                  <div className={`pt-2 text-[9px] font-mono opacity-50 flex items-center justify-center gap-1 ${
                    theme === 'minimal-white' ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    <span>CUSAC Web Designer</span>
                    <span>·</span>
                    <span>633 73 76 52</span>
                  </div>
                </div>

                {/* Bottom Stand Base Notch representation */}
                <div className={`absolute -bottom-2 inset-x-8 h-2 rounded-b-md ${
                  theme === 'minimal-white' ? 'bg-zinc-300' : 'bg-zinc-900 border-t border-white/20'
                }`} />
              </div>

            </div>

            {/* Quick Helper note */}
            <p className="text-center text-[11px] text-zinc-400">
              Prueba a escanear este código con la cámara de tu smartphone real para abrir el menú en tu propio dispositivo.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
