/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { INITIAL_RESTAURANT } from './data/initialMenu';
import { RestaurantData, Dish } from './types/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { LiveDemoHub } from './components/LiveDemoHub';
import { AdminPortal } from './components/AdminPortal';
import { CustomerMenu } from './components/CustomerMenu';
import { QRStudio } from './components/QRStudio';
import { PricingCalculator } from './components/PricingCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArrowLeft, Smartphone, QrCode } from 'lucide-react';

const STORAGE_KEY = 'cusac_qr_restaurant_state_v1';

export default function App() {
  const [restaurant, setRestaurant] = useState<RestaurantData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error loading saved state:', e);
        }
      }
    }
    return INITIAL_RESTAURANT;
  });

  const [activeTab, setActiveTab] = useState<
    'landing' | 'demo' | 'admin' | 'guest' | 'qr-studio' | 'pricing' | 'contact'
  >('landing');

  const [guestTableNumber, setGuestTableNumber] = useState('04');
  const [selectedPlanForContact, setSelectedPlanForContact] = useState<string | undefined>();

  // Check if URL has ?mesa=X query param (e.g. from QR scan)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const mesa = params.get('mesa');
      if (mesa) {
        setGuestTableNumber(mesa);
        setActiveTab('guest');
      }
    }
  }, []);

  // Save to localStorage whenever restaurant data updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurant));
    }
  }, [restaurant]);

  // Handlers for real-time mutations
  const handleUpdateDish = (updatedDish: Dish) => {
    setRestaurant((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) => (d.id === updatedDish.id ? updatedDish : d)),
    }));
  };

  const handleAddDish = (newDishData: Omit<Dish, 'id'>) => {
    const newId = `dish-${Date.now()}`;
    const dish: Dish = {
      ...newDishData,
      id: newId,
    };
    setRestaurant((prev) => ({
      ...prev,
      dishes: [dish, ...prev.dishes],
    }));
  };

  const handleDeleteDish = (dishId: string) => {
    setRestaurant((prev) => ({
      ...prev,
      dishes: prev.dishes.filter((d) => d.id !== dishId),
    }));
  };

  const handleToggleAvailability = (dishId: string) => {
    setRestaurant((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) =>
        d.id === dishId ? { ...d, available: !d.available } : d
      ),
    }));
  };

  const handleQuickPriceChange = (dishId: string, newPrice: number) => {
    setRestaurant((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) =>
        d.id === dishId ? { ...d, price: newPrice } : d
      ),
    }));
  };

  const handleResetMenu = () => {
    setRestaurant(INITIAL_RESTAURANT);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlanForContact(planName);
    setActiveTab('contact');
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const activeDishesCount = restaurant.dishes.filter((d) => d.available).length;

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* If directly viewing guest mode (e.g. customer scanned QR on table), offer clean header with return option */}
      {activeTab === 'guest' ? (
        <div className="flex-1 flex flex-col">
          <div className="bg-black/90 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-zinc-300">
            <button
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Web Principal</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Vista de Comensal en Mesa {guestTableNumber}</span>
            </div>
            <button
              onClick={() => setActiveTab('demo')}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              Abrir Simulador Dual
            </button>
          </div>
          <div className="flex-1 max-w-2xl w-full mx-auto p-4 sm:p-6">
            <CustomerMenu restaurant={restaurant} tableNumber={guestTableNumber} />
          </div>
        </div>
      ) : (
        <>
          {/* Main Top Navigation */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLiveDemo={() => setActiveTab('demo')}
          />

          {/* Main Body Routing */}
          <main className="flex-1">
            {activeTab === 'landing' && (
              <>
                <Hero
                  onOpenDemo={() => setActiveTab('demo')}
                  onOpenQRStudio={() => setActiveTab('qr-studio')}
                  activeDishesCount={activeDishesCount}
                />

                {/* Interactive Demo Teaser Section in Landing */}
                <section className="py-20 border-b border-white/5 bg-[#08090d]">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    <div className="max-w-2xl space-y-2">
                      <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
                        Demostración en Tiempo Real
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Pruébalo ahora mismo: cambia un precio o esconde un plato.
                      </h2>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                        No hay trucos ni maquetas estáticas. Interactúa con el panel de administración y observa cómo el móvil del comensal a la derecha recibe la actualización sin recargar.
                      </p>
                    </div>

                    <LiveDemoHub
                      restaurant={restaurant}
                      onUpdateDish={handleUpdateDish}
                      onAddDish={handleAddDish}
                      onDeleteDish={handleDeleteDish}
                      onToggleAvailability={handleToggleAvailability}
                      onQuickPriceChange={handleQuickPriceChange}
                      onResetMenu={handleResetMenu}
                    />
                  </div>
                </section>

                <Features />
                <PricingCalculator onSelectPlan={handleSelectPlan} />
                <ContactSection preselectedPlan={selectedPlanForContact} />
              </>
            )}

            {activeTab === 'demo' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Simulador de Carta & Portal en Directo
                    </h1>
                    <p className="text-xs text-zinc-300">
                      Entorno de prueba sincronizado: Portal Propietario (Cocina/Sala) y Menú Comensal en Mesa.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('qr-studio')}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Diseñar Soporte de Mesa</span>
                  </button>
                </div>

                <LiveDemoHub
                  restaurant={restaurant}
                  onUpdateDish={handleUpdateDish}
                  onAddDish={handleAddDish}
                  onDeleteDish={handleDeleteDish}
                  onToggleAvailability={handleToggleAvailability}
                  onQuickPriceChange={handleQuickPriceChange}
                  onResetMenu={handleResetMenu}
                />
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      Portal de Administración del Restaurante
                    </h1>
                    <p className="text-xs text-zinc-300">
                      Gestiona la disponibilidad de cocina, precios de mercado y nuevos platos en tiempo real.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('demo')}
                    className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Ver con Pantalla Dividida</span>
                  </button>
                </div>

                <AdminPortal
                  restaurant={restaurant}
                  onUpdateDish={handleUpdateDish}
                  onAddDish={handleAddDish}
                  onDeleteDish={handleDeleteDish}
                  onToggleAvailability={handleToggleAvailability}
                  onQuickPriceChange={handleQuickPriceChange}
                  onOpenLivePreview={() => setActiveTab('guest')}
                />
              </div>
            )}

            {activeTab === 'qr-studio' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <QRStudio
                  restaurant={restaurant}
                  onOpenCustomerView={(tbl) => {
                    setGuestTableNumber(tbl);
                    setActiveTab('guest');
                  }}
                />
              </div>
            )}

            {activeTab === 'pricing' && (
              <PricingCalculator onSelectPlan={handleSelectPlan} />
            )}

            {activeTab === 'contact' && (
              <ContactSection preselectedPlan={selectedPlanForContact} />
            )}
          </main>

          <Footer onNavigate={setActiveTab} />
        </>
      )}

    </div>
  );
}
