import React, { useState } from 'react';
import { Dish, RestaurantData, Allergen } from '../types/restaurant';
import { 
  Plus, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  DollarSign, 
  Check, 
  X, 
  Sparkles, 
  Search, 
  Filter, 
  Users, 
  Layers,
  ArrowUpRight,
  Download
} from 'lucide-react';

interface AdminPortalProps {
  restaurant: RestaurantData;
  onUpdateDish: (updatedDish: Dish) => void;
  onAddDish: (newDish: Omit<Dish, 'id'>) => void;
  onDeleteDish: (dishId: string) => void;
  onToggleAvailability: (dishId: string) => void;
  onQuickPriceChange: (dishId: string, newPrice: number) => void;
  onOpenLivePreview?: () => void;
}

const ALLERGEN_OPTIONS: { id: Allergen; label: string }[] = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'lacteos', label: 'Lácteos' },
  { id: 'huevos', label: 'Huevos' },
  { id: 'pescado', label: 'Pescado' },
  { id: 'crustaceos', label: 'Marisco' },
  { id: 'frutos_secos', label: 'Frutos secos' },
  { id: 'soja', label: 'Soja' },
  { id: 'mostaza', label: 'Mostaza' },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  restaurant,
  onUpdateDish,
  onAddDish,
  onDeleteDish,
  onToggleAvailability,
  onQuickPriceChange,
  onOpenLivePreview,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  // New Dish Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState(restaurant.categories[0]?.id || 'entrantes');
  const [newPrice, setNewPrice] = useState('18.00');
  const [newDescription, setNewDescription] = useState('');
  const [newBadge, setNewBadge] = useState<Dish['badge']>('Recomendado');
  const [newAllergens, setNewAllergens] = useState<Allergen[]>([]);
  const [newImage, setNewImage] = useState('');

  // Editing existing dish price inline
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const activeCount = restaurant.dishes.filter(d => d.available).length;
  const outOfStockCount = restaurant.dishes.filter(d => !d.available).length;

  const handleStartEditPrice = (dish: Dish) => {
    setEditingPriceId(dish.id);
    setTempPrice(dish.price.toString());
  };

  const handleSavePrice = (dishId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val >= 0) {
      onQuickPriceChange(dishId, val);
    }
    setEditingPriceId(null);
  };

  const handleToggleAllergen = (allergen: Allergen) => {
    setNewAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddDish({
      name: newName.trim(),
      category: newCategory,
      price: parseFloat(newPrice) || 15.00,
      description: newDescription.trim() || 'Elaboración con ingredientes selectos de temporada.',
      badge: newBadge || undefined,
      available: true,
      allergens: newAllergens,
      image: newImage.trim() || undefined,
      prepTime: '12 min',
    });

    // Reset Form
    setNewName('');
    setNewPrice('18.00');
    setNewDescription('');
    setNewAllergens([]);
    setNewImage('');
    setShowAddModal(false);
  };

  const filteredDishes = restaurant.dishes.filter(d => {
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (searchFilter && !d.name.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300 font-medium">Platos en Carta</p>
            <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">{restaurant.dishes.length}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300 font-medium">Platos Visibles</p>
            <p className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">{activeCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300 font-medium">Ocultos / Agotados</p>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">{outOfStockCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <EyeOff className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-300 font-medium">Comensales en Vivo</p>
            <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">14 en línea</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/10">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Filtrar platos por nombre..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/cusac_web_designer.zip"
            download="cusac_web_designer.zip"
            title="Descargar copia del proyecto para guardar en C:\Users\Usuario\Desktop\My Cusac Web"
            className="px-3.5 py-2 rounded-lg text-xs font-medium border border-cyan-500/30 bg-cyan-950/20 text-cyan-200 hover:bg-cyan-900/40 hover:border-cyan-500/50 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Descargar ZIP (Copia Local)</span>
          </a>

          {onOpenLivePreview && (
            <button
              onClick={onOpenLivePreview}
              className="px-3.5 py-2 rounded-lg text-xs font-medium border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Ver Menú del Cliente</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir Nuevo Plato</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-white text-black font-semibold'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
          }`}
        >
          Todos ({restaurant.dishes.length})
        </button>
        {restaurant.categories.map((c) => {
          const count = restaurant.dishes.filter(d => d.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Dishes Management Table / List */}
      <div className="rounded-xl border border-white/10 bg-zinc-950/80 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-white">Gestión de Carta en Tiempo Real</span>
            <span className="text-[11px] text-zinc-400">
              · Los cambios se transmiten inmediatamente al comensal
            </span>
          </div>
          <span className="text-xs text-zinc-400">
            {filteredDishes.length} platos listados
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {filteredDishes.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs">
              No se han encontrado platos con los filtros seleccionados.
            </div>
          ) : (
            filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className={`p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                  !dish.available ? 'bg-black/40 opacity-70' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Left: Dish summary */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-zinc-300 font-bold text-xs">
                      {dish.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{dish.name}</span>
                      {dish.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-zinc-300">
                          {dish.badge}
                        </span>
                      )}
                      {!dish.available && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-medium">
                          Oculto / Agotado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-300 line-clamp-1 max-w-xl">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Center / Right: Real-time Price changer & Status toggle */}
                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  {/* Real-time price modifier */}
                  <div className="flex items-center gap-1.5">
                    {editingPriceId === dish.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.5"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSavePrice(dish.id)}
                          className="w-20 px-2 py-1 rounded bg-black border border-white/40 text-xs text-white font-mono"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSavePrice(dish.id)}
                          className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEditPrice(dish)}
                        title="Click para cambiar precio en vivo"
                        className="px-2.5 py-1 rounded border border-white/10 bg-white/[0.04] hover:border-white/30 text-white font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer group"
                      >
                        <span>{dish.price.toFixed(2)} €</span>
                        <Edit3 className="w-3 h-3 text-zinc-300 group-hover:text-white" />
                      </button>
                    )}
                  </div>

                  {/* Quick Availability Toggle */}
                  <button
                    onClick={() => onToggleAvailability(dish.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      dish.available
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-zinc-900 border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {dish.available ? (
                      <>
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Visible en Carta</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ocultar Plato</span>
                      </>
                    )}
                  </button>

                  {/* Delete Dish */}
                  <button
                    onClick={() => onDeleteDish(dish.id)}
                    title="Eliminar plato"
                    className="p-1.5 rounded-lg text-zinc-300 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Dish Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-white" />
                <h3 className="text-base font-bold text-white">Añadir Nuevo Plato a la Carta</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDish} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Nombre del Plato *</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Arroz Meloso con Bogavante"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Categoría</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                  >
                    {restaurant.categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Precio (€) *</label>
                  <input
                    type="number"
                    step="0.10"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Descripción / Ingredientes</label>
                <textarea
                  rows={3}
                  placeholder="Describe la elaboración, productos de origen y guarnición..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Etiqueta Destacada</label>
                  <select
                    value={newBadge || ''}
                    onChange={(e) => setNewBadge((e.target.value as Dish['badge']) || undefined)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="">Sin etiqueta</option>
                    <option value="Recomendado">Recomendado</option>
                    <option value="Especialidad">Especialidad</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Nuevo">Nuevo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Foto (Opcional)</label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="">Sin foto (icono genérico)</option>
                    <option value="/src/assets/images/dish_prime_steak_1793981797375.jpg">Foto Brasa / Carne</option>
                    <option value="/src/assets/images/dish_tapas_gourmet_1793981797985.jpg">Foto Tapa / Marisco</option>
                    <option value="/src/assets/images/dish_craft_cocktail_1793981797337.jpg">Foto Cóctel / Bebida</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">Alérgenos Presentes</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALLERGEN_OPTIONS.map((a) => (
                    <label
                      key={a.id}
                      className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] cursor-pointer transition-colors ${
                        newAllergens.includes(a.id)
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-black/50 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newAllergens.includes(a.id)}
                        onChange={() => handleToggleAllergen(a.id)}
                        className="rounded border-zinc-700 text-white focus:ring-0"
                      />
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Guardar y Publicar en Vivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
