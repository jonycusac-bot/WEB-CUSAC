import React, { useState, useMemo } from 'react';
import { Dish, RestaurantData, Allergen } from '../types/restaurant';
import { 
  Search, 
  Wifi, 
  Bell, 
  Receipt, 
  Clock, 
  Check, 
  Info, 
  X, 
  ShieldCheck, 
  Sparkles,
  Flame,
  Utensils
} from 'lucide-react';

interface CustomerMenuProps {
  restaurant: RestaurantData;
  tableNumber?: string;
  isSimulatedMobile?: boolean;
  lastUpdatedTimestamp?: number;
}

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: 'Gluten',
  lacteos: 'Lácteos',
  huevos: 'Huevos',
  pescado: 'Pescado',
  crustaceos: 'Marisco',
  frutos_secos: 'Frutos secos',
  soja: 'Soja',
  mostaza: 'Mostaza',
};

export const CustomerMenu: React.FC<CustomerMenuProps> = ({
  restaurant,
  tableNumber = '04',
  isSimulatedMobile = false,
  lastUpdatedTimestamp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAllergenFilter, setActiveAllergenFilter] = useState<Allergen | null>(null);
  const [selectedDishModal, setSelectedDishModal] = useState<Dish | null>(null);
  
  // Waiter & Bill interaction states
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [billRequested, setBillRequested] = useState<'card' | 'cash' | null>(null);
  const [showWifiModal, setShowWifiModal] = useState(false);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    return restaurant.dishes.filter((dish) => {
      // Must be available for customer
      if (!dish.available) return false;

      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Allergen filter (exclude dishes containing this allergen)
      if (activeAllergenFilter && dish.allergens.includes(activeAllergenFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      return true;
    });
  }, [restaurant.dishes, selectedCategory, activeAllergenFilter, searchQuery]);

  const handleCallWaiter = () => {
    setWaiterCalled(true);
    setTimeout(() => {
      setWaiterCalled(false);
    }, 4000);
  };

  const handleRequestBill = (method: 'card' | 'cash') => {
    setBillRequested(method);
    setTimeout(() => {
      setBillRequested(null);
    }, 4500);
  };

  return (
    <div className={`bg-[#0a0b10] text-zinc-100 min-h-full flex flex-col font-sans ${isSimulatedMobile ? 'text-xs' : ''}`}>
      
      {/* Top Bar for Table Guest */}
      <div className="sticky top-0 z-30 bg-[#0a0b10]/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">{restaurant.name}</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-white/10 text-zinc-300">
                Mesa {tableNumber}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-[200px]">{restaurant.tagline}</p>
          </div>

          <div className="flex items-center gap-1.5">
            {restaurant.wifiName && (
              <button
                onClick={() => setShowWifiModal(true)}
                title="Ver Wi-Fi"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
              >
                <Wifi className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleCallWaiter}
              disabled={waiterCalled}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                waiterCalled
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bell className="w-3 h-3" />
              <span>{waiterCalled ? 'Camarero avisado' : 'Llamar'}</span>
            </button>
          </div>
        </div>

        {/* Real-time sync alert if changed recently */}
        {lastUpdatedTimestamp && (
          <div className="mt-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center justify-between text-[11px] text-zinc-300 animate-pulse">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Menú sincronizado con cocina en tiempo real</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Actual</span>
          </div>
        )}

        {/* Search & Allergen Strip */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar plato, ingrediente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Toda la Carta
          </button>
          {restaurant.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Allergen Filters bar */}
        <div className="mt-2 flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
          <span className="text-zinc-400 shrink-0 text-[10px]">Sin:</span>
          {(['gluten', 'lacteos', 'pescado', 'crustaceos'] as Allergen[]).map((allergen) => (
            <button
              key={allergen}
              onClick={() => setActiveAllergenFilter(activeAllergenFilter === allergen ? null : allergen)}
              className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap border transition-colors cursor-pointer ${
                activeAllergenFilter === allergen
                  ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                  : 'bg-transparent border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              {ALLERGEN_LABELS[allergen]}
            </button>
          ))}
          {activeAllergenFilter && (
            <button
              onClick={() => setActiveAllergenFilter(null)}
              className="text-zinc-400 hover:text-white text-[10px] underline ml-1"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Dishes List */}
      <div className="flex-1 p-4 space-y-4">
        {filteredDishes.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Utensils className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-sm font-medium text-white">No hay platos disponibles</p>
            <p className="text-xs text-zinc-400">Prueba cambiando la categoría o los filtros de alérgenos.</p>
          </div>
        ) : (
          filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDishModal(dish)}
              className="group rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] p-3 transition-all cursor-pointer flex gap-3.5 items-start"
            >
              {/* Dish Photo if available */}
              {dish.image ? (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-zinc-600">
                  <Flame className="w-6 h-6 text-zinc-400" />
                </div>
              )}

              {/* Dish Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-white group-hover:text-zinc-100 transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    {dish.badge && (
                      <span className="inline-block text-[10px] font-medium text-zinc-400">
                        {dish.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold font-mono text-white tabular-nums shrink-0">
                    {dish.price.toFixed(2)} {restaurant.currencySymbol}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                  {dish.description}
                </p>

                {/* Allergens & Prep metadata */}
                <div className="pt-1 flex items-center gap-2 text-[10px] text-zinc-400">
                  {dish.prepTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{dish.prepTime}</span>
                    </span>
                  )}
                  {dish.allergens.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">
                        Alérgenos: {dish.allergens.map((a) => ALLERGEN_LABELS[a]).join(', ')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Bottom Action for Table Guest (Pedir la cuenta) */}
      <div className="sticky bottom-0 bg-[#0a0b10]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between gap-2">
        <div className="text-[11px] text-zinc-400">
          <span>¿Listo para finalizar?</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRequestBill('card')}
            disabled={billRequested !== null}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>{billRequested === 'card' ? 'Pidiendo datáfono...' : 'Cuenta (Tarjeta)'}</span>
          </button>
          <button
            onClick={() => handleRequestBill('cash')}
            disabled={billRequested !== null}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
          >
            <span>{billRequested === 'cash' ? 'Camarero en camino...' : 'Efectivo'}</span>
          </button>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in duration-200">
            {selectedDishModal.image && (
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={selectedDishModal.image}
                  alt={selectedDishModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
              </div>
            )}
            <button
              onClick={() => setSelectedDishModal(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedDishModal.name}</h3>
                  {selectedDishModal.badge && (
                    <span className="text-xs text-zinc-300 font-medium">
                      {selectedDishModal.badge}
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold font-mono text-white tabular-nums">
                  {selectedDishModal.price.toFixed(2)} {restaurant.currencySymbol}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedDishModal.description}
              </p>

              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Tiempo aproximado:</span>
                  <span className="text-white font-medium">{selectedDishModal.prepTime || '10-15 min'}</span>
                </div>
                {selectedDishModal.calories && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Aporte calórico:</span>
                    <span className="text-white font-medium">{selectedDishModal.calories} kcal</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-zinc-400 block mb-1">Información de Alérgenos:</span>
                  {selectedDishModal.allergens.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDishModal.allergens.map((a) => (
                        <span key={a} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-zinc-300">
                          {ALLERGEN_LABELS[a]}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Libre de alérgenos principales</span>
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedDishModal(null)}
                className="w-full py-2.5 bg-white text-black font-semibold rounded-lg text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wi-Fi Details Modal */}
      {showWifiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-xs w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>Wi-Fi del Restaurante</span>
              </div>
              <button
                onClick={() => setShowWifiModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-white/5 border border-white/10">
                <p className="text-zinc-400 text-[10px]">Red:</p>
                <p className="font-mono text-white font-semibold">{restaurant.wifiName}</p>
              </div>
              <div className="p-2.5 rounded bg-white/5 border border-white/10">
                <p className="text-zinc-400 text-[10px]">Contraseña:</p>
                <p className="font-mono text-white font-semibold">{restaurant.wifiPass}</p>
              </div>
            </div>

            <button
              onClick={() => setShowWifiModal(false)}
              className="w-full py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Listo
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
