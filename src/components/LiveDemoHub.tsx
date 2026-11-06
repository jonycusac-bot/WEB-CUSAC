import React, { useState } from 'react';
import { RestaurantData, Dish } from '../types/restaurant';
import { AdminPortal } from './AdminPortal';
import { CustomerMenu } from './CustomerMenu';
import { 
  Smartphone, 
  LayoutDashboard, 
  Split, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface LiveDemoHubProps {
  restaurant: RestaurantData;
  onUpdateDish: (updatedDish: Dish) => void;
  onAddDish: (newDish: Omit<Dish, 'id'>) => void;
  onDeleteDish: (dishId: string) => void;
  onToggleAvailability: (dishId: string) => void;
  onQuickPriceChange: (dishId: string, newPrice: number) => void;
  onResetMenu: () => void;
}

export const LiveDemoHub: React.FC<LiveDemoHubProps> = ({
  restaurant,
  onUpdateDish,
  onAddDish,
  onDeleteDish,
  onToggleAvailability,
  onQuickPriceChange,
  onResetMenu,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'admin-only' | 'guest-only'>('split');
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const triggerSyncFeedback = (message: string) => {
    setLastSyncTime(Date.now());
    setSyncNotice(message);
    setTimeout(() => {
      setSyncNotice(null);
    }, 3500);
  };

  const handleToggle = (dishId: string) => {
    const dish = restaurant.dishes.find(d => d.id === dishId);
    onToggleAvailability(dishId);
    triggerSyncFeedback(
      dish?.available 
        ? `Plato "${dish.name}" ocultado en tiempo real en las mesas` 
        : `Plato "${dish?.name}" reactivado en las mesas`
    );
  };

  const handlePriceChange = (dishId: string, newPrice: number) => {
    const dish = restaurant.dishes.find(d => d.id === dishId);
    onQuickPriceChange(dishId, newPrice);
    triggerSyncFeedback(`Precio de "${dish?.name}" actualizado a ${newPrice.toFixed(2)}€`);
  };

  const handleAdd = (newDish: Omit<Dish, 'id'>) => {
    onAddDish(newDish);
    triggerSyncFeedback(`"${newDish.name}" añadido y visible en mesa`);
  };

  const handleDelete = (dishId: string) => {
    onDeleteDish(dishId);
    triggerSyncFeedback(`Plato retirado de la carta`);
  };

  // Quick preset test triggers for effortless user evaluation
  const simulateOutOfStock = () => {
    const steak = restaurant.dishes.find(d => d.id === 'dish-3');
    if (steak) {
      handleToggle('dish-3');
    }
  };

  const simulatePriceTweak = () => {
    const cocktail = restaurant.dishes.find(d => d.id === 'dish-9');
    if (cocktail) {
      const nextPrice = cocktail.price === 14.5 ? 16.0 : 14.5;
      handlePriceChange('dish-9', nextPrice);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controller Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                Simulador de Sincronización en Tiempo Real
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 rounded">
                Latencia: 0.02s
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              Haz un cambio a la izquierda en el Portal del Propietario y observa cómo se refleja al instante a la derecha en el móvil del comensal.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-lg border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'split' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Vista Dividida</span>
            </button>
            <button
              onClick={() => setViewMode('admin-only')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'admin-only' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Solo Portal Dueño</span>
            </button>
            <button
              onClick={() => setViewMode('guest-only')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'guest-only' ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Solo Menú Mesa</span>
            </button>
          </div>
        </div>

        {/* Quick Simulation Shortcuts & Status Notice */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 text-xs">Pruebas rápidas:</span>
            <button
              onClick={simulateOutOfStock}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Ocultar/Mostrar Ribeye Steak
            </button>
            <button
              onClick={simulatePriceTweak}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              Cambiar Precio Cóctel
            </button>
            <button
              onClick={onResetMenu}
              title="Restablecer valores iniciales"
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>

          {syncNotice && (
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{syncNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Dual Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Owner Admin Portal */}
        {(viewMode === 'split' || viewMode === 'admin-only') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="border border-white/10 rounded-2xl bg-[#090a0f] p-4 sm:p-6 shadow-xl">
              <div className="mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  <span className="font-bold text-sm text-white">Portal Propietario · Modo Operativo</span>
                </div>
                <span className="text-xs text-zinc-300 font-mono">
                  {restaurant.name}
                </span>
              </div>

              <AdminPortal
                restaurant={restaurant}
                onUpdateDish={onUpdateDish}
                onAddDish={handleAdd}
                onDeleteDish={handleDelete}
                onToggleAvailability={handleToggle}
                onQuickPriceChange={handlePriceChange}
                onOpenLivePreview={() => setViewMode('guest-only')}
              />
            </div>
          </div>
        )}

        {/* Right Side: Customer Guest Table View (Framed inside a sleek phone mock in split mode) */}
        {(viewMode === 'split' || viewMode === 'guest-only') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12 max-w-xl mx-auto'}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-semibold text-white">
                    Vista del Comensal · Mesa 04
                  </span>
                </div>
                <span className="text-[11px] text-zinc-300 font-mono">
                  Escaneado mediante QR
                </span>
              </div>

              {/* Smartphone Bezel Container */}
              <div className="relative mx-auto rounded-[36px] border-4 border-zinc-800 bg-black p-3 shadow-2xl overflow-hidden max-w-[390px]">
                {/* Speaker ear notch */}
                <div className="w-24 h-4 bg-zinc-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
                </div>

                {/* Inner Screen */}
                <div className="rounded-[24px] overflow-hidden border border-white/10 max-h-[680px] overflow-y-auto">
                  <CustomerMenu
                    restaurant={restaurant}
                    tableNumber="04"
                    isSimulatedMobile={true}
                    lastUpdatedTimestamp={lastSyncTime}
                  />
                </div>

                {/* Home Indicator Bar */}
                <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-2.5"></div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
